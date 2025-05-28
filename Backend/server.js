import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/connection.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
  })
);

// Handle OPTIONS requests
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(sessionMiddleware);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <p style="color: rgb(0, 255, 55); text-align: center; font-size: 100px; margin-top: 30px;">
      Server is running on PORT ${port}
    </p>
  `);
});

server.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});