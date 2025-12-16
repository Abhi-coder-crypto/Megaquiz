import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { username, password } = req.body;
  
  if (username === 'megacv@gmail.com' && password === 'megacv') {
    return res.status(200).json({ success: true, message: 'Login successful' });
  }
  
  return res.status(401).json({ success: false, error: 'Invalid credentials' });
}
