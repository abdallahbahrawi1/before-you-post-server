import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
require('dotenv').config();

// Import routes
import authRoutes from './routes/authRoutes';
import homeRoutes from './routes/homeRoutes';
import requestRoutes from './routes/requestRoutes';
import reviewRoutes from './routes/reviewRoutes';

// Import database initialization
import { initializeDatabase } from './database';
import './config/passport-setup';

const app = express();
const corsOrigin = process.env.CORS_ORIGIN;

const ALLOWLIST = new Set((corsOrigin ? corsOrigin.split(',') : []).map(origin => origin.trim()));

console.log("CORS Allowlist:", ALLOWLIST);
// Middleware
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWLIST.has(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

// Initialize database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Initialize database first
    await initializeDatabase();
    
    // Start server after database is ready
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

app.use('', homeRoutes)
app.use('/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/reviews', reviewRoutes);

// cookies
app.get('/set-cookies', (req, res) => {
	res.cookie('newUser', false);
	res.send('You got the cookies!');
});