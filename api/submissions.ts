import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

let cachedClient: MongoClient | null = null;

async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }
  return cachedClient.db('megacv_quiz');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { participantId, answers } = req.body;
      
      if (!participantId || typeof participantId !== 'string') {
        return res.status(400).json({ error: 'Participant ID required' });
      }
      if (!answers || typeof answers !== 'object') {
        return res.status(400).json({ error: 'Answers required' });
      }
      
      const db = await getDb();
      const collection = db.collection('submissions');
      
      const doc = { participantId, answers, submittedAt: new Date() };
      const result = await collection.insertOne(doc);
      
      return res.status(200).json({
        _id: result.insertedId.toString(),
        participantId,
        answers,
        submittedAt: doc.submittedAt,
      });
    } catch (error: any) {
      console.error('Error creating submission:', error);
      return res.status(500).json({ error: 'Failed to submit answers' });
    }
  }
  
  if (req.method === 'GET') {
    try {
      const db = await getDb();
      const submissionsCol = db.collection('submissions');
      const participantsCol = db.collection('participants');
      
      const submissions = await submissionsCol.find().sort({ submittedAt: -1 }).toArray();
      
      const results: any[] = [];
      
      for (const sub of submissions) {
        try {
          const participantDoc = await participantsCol.findOne({ 
            _id: new ObjectId(sub.participantId) 
          });
          
          if (participantDoc) {
            results.push({
              _id: sub._id.toString(),
              participantId: sub.participantId,
              answers: sub.answers,
              submittedAt: sub.submittedAt,
              participant: {
                _id: participantDoc._id.toString(),
                name: participantDoc.name,
                email: participantDoc.email,
                phone: participantDoc.phone,
                createdAt: participantDoc.createdAt,
              },
            });
          }
        } catch {
          // Skip invalid participants
        }
      }
      
      return res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
