import { MongoClient, ObjectId, Db } from "mongodb";
import type {
  Participant,
  InsertParticipant,
  Submission,
  InsertSubmission,
  SubmissionWithParticipant,
} from "@shared/schema";

export interface IStorage {
  createParticipant(participant: InsertParticipant): Promise<Participant>;
  getParticipant(id: string): Promise<Participant | undefined>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getAllSubmissions(): Promise<SubmissionWithParticipant[]>;
}

class MongoStorage implements IStorage {
  private client: MongoClient;
  private db: Db | null = null;

  constructor() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI environment variable is required");
    }
    this.client = new MongoClient(uri);
  }

  private async getDb(): Promise<Db> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db("megacv_quiz");
    }
    return this.db;
  }

  async createParticipant(insertParticipant: InsertParticipant): Promise<Participant> {
    const db = await this.getDb();
    const collection = db.collection("participants");
    
    const doc = {
      ...insertParticipant,
      createdAt: new Date(),
    };
    
    const result = await collection.insertOne(doc);
    
    return {
      _id: result.insertedId.toString(),
      ...insertParticipant,
      createdAt: doc.createdAt,
    };
  }

  async getParticipant(id: string): Promise<Participant | undefined> {
    const db = await this.getDb();
    const collection = db.collection("participants");
    
    try {
      const doc = await collection.findOne({ _id: new ObjectId(id) });
      if (!doc) return undefined;
      
      return {
        _id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        phone: doc.phone,
        createdAt: doc.createdAt,
      };
    } catch {
      return undefined;
    }
  }

  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const db = await this.getDb();
    const collection = db.collection("submissions");
    
    const doc = {
      ...insertSubmission,
      submittedAt: new Date(),
    };
    
    const result = await collection.insertOne(doc);
    
    return {
      _id: result.insertedId.toString(),
      ...insertSubmission,
      submittedAt: doc.submittedAt,
    };
  }

  async getAllSubmissions(): Promise<SubmissionWithParticipant[]> {
    const db = await this.getDb();
    const submissionsCol = db.collection("submissions");
    const participantsCol = db.collection("participants");
    
    const submissions = await submissionsCol
      .find()
      .sort({ submittedAt: -1 })
      .toArray();
    
    const results: SubmissionWithParticipant[] = [];
    
    for (const sub of submissions) {
      let participant: Participant | null = null;
      
      try {
        const participantDoc = await participantsCol.findOne({ 
          _id: new ObjectId(sub.participantId) 
        });
        
        if (participantDoc) {
          participant = {
            _id: participantDoc._id.toString(),
            name: participantDoc.name,
            email: participantDoc.email,
            phone: participantDoc.phone,
            createdAt: participantDoc.createdAt,
          };
        }
      } catch {
        // Participant not found
      }
      
      if (participant) {
        results.push({
          _id: sub._id.toString(),
          participantId: sub.participantId,
          answers: sub.answers,
          submittedAt: sub.submittedAt,
          participant,
        });
      }
    }
    
    return results;
  }
}

export const storage = new MongoStorage();
