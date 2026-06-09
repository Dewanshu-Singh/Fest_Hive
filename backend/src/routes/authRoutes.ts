import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // For demo purposes, we will mock auth if no DB is available or use a hardcoded admin
    // In a real app, use bcrypt.compare(password, user.passwordHash)
    if (email === 'admin@festhive.com' && password === 'admin123') {
      const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
      res.json({ token, user: { email, role: 'admin' } });
      return;
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
