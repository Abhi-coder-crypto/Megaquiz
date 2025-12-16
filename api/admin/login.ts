import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { username, password } = req.body;
  
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ success: false, error: 'Server configuration error' });
  }
  
  if (username === adminEmail && password === adminPassword) {
    return res.status(200).json({ success: true, message: 'Login successful' });
  }
  
  return res.status(401).json({ success: false, error: 'Invalid credentials' });
}
