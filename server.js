import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Notiflix from 'notiflix';
// import appointmentRoutes from './routes/appointmentRoutes.js';
import registerRoutes from './routes/registerRoutes.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api/appointments', appointmentRoutes);
app.use('/api/register', registerRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});