import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Notiflix from 'notiflix';
import authRoutes from './routes/authRoute.js';
import tattooRoutes from './routes/tattooRoute.js';
import photoRoutes from "./routes/photoRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // or your frontend URL
  credentials: true
}));
app.use(express.json());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api', authRoutes);
app.use('/api', tattooRoutes);
app.use("/api", photoRoutes);
app.use("/api", appointmentRoute);

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