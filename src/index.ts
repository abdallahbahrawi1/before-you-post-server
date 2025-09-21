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

// Middleware
app.use(cors({
  origin: corsOrigin, // Frontend origin
  credentials: true, // Allow cookies to be sent with requests
}));

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
app.get('/protected')

// cookies
app.get('/set-cookies', (req, res) => {
	res.cookie('newUser', false);
	res.send('You got the cookies!');
});