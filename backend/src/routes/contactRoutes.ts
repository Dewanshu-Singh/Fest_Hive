import express, { Request, Response } from 'express';
import ContactQuery from '../models/ContactQuery';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public: Submit a query
router.post('/', async (req: Request, res: Response) => {
  try {
    const query = new ContactQuery(req.body);
    await query.save();
    res.status(201).json({ message: 'Query submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid query data' });
  }
});

// Admin: Get all queries
router.get('/', protect, async (req: Request, res: Response) => {
  try {
    const queries = await ContactQuery.find().sort({ createdAt: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Mark as read
router.put('/:id/read', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const query = await ContactQuery.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (query) {
      res.json(query);
    } else {
      res.status(404).json({ message: 'Query not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Delete query
router.delete('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const query = await ContactQuery.findByIdAndDelete(req.params.id);
    if (query) {
      res.json({ message: 'Query deleted' });
    } else {
      res.status(404).json({ message: 'Query not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
