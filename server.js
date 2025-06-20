import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Notiflix from 'notiflix';
import authRoutes from './routes/authRoute.js';


dotenv.config();
const app = express();

// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // or your frontend URL
  credentials: true
}));
app.use(express.json());

app.use('/api', authRoutes);

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "inklens-db" // 👈 Specific to your project
})
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});