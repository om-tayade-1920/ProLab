import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URI;

import express from 'express';
const app = express();

import cors from 'cors';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';

// Routes
import userRouter from './routes/userRoute.js';
import projectRouter from './routes/projectRoute.js'; 
import errorMiddleware from './middleware/errorMiddleware.js';

//  Connect to MongoDB
connectDB(DB_URL);

//  Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Adjust for frontend port
  credentials: true,
}));

//  Route Setup
app.use('/user', userRouter);
app.use('/project', projectRouter);   


//  Root API Test Route
app.get('/', (req, res) => {
  res.send("🎯 Project Repository API is running...");
});

//  Error Handling Middleware
app.use(errorMiddleware);

//  Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
