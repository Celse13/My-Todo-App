import type { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, token } = req.body;

    if (token) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (payload) {
        res.status(200).json({ message: 'Login successful', user: payload });
      } else {
        res.status(401).json({ message: 'Invalid Google token' });
      }
    } else if (username && password) {
      const user = await authenticateUser(username, password);
      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(400).json({ message: 'Missing credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

async function authenticateUser(username: string, password: string) {
  // Replace this with your actual user authentication logic
  if (username === 'user' && password === 'password') {
    return { id: 1, username: 'user' };
  }
  return null;
}
