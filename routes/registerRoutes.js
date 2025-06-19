import express from 'express';
const router = express.Router();

// Dummy route
router.post('/register', (req, res) => {
  res.json({ message: 'Register successfully' });
});

export default router;