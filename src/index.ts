import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import { checkUser } from './middlewares/authenticateJWT';
import './config/passport-setup';
// 
// Test the connection to the database
console.log('Testing the database connection...');
sequelize.authenticate()
.then(() => {
	console.log('Connected to the database.');
})
.catch(err => {
	console.error('Error connecting to the database:', err);
});

// Synchronize the models with the database
sequelize.sync(
	// {alter: true}
	{force: true}
)
.then(() => {
	console.log('Database synchronization complete.');
})
.catch((err: any) => {
	console.error('Error synchronizing the database:', err);
});


const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin
  credentials: true, // Allow cookies to be sent with requests
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Routes
// app.use('*', checkUser);
app.use('/auth', authRoutes);
app.get('/protected')

// cookies
app.get('/set-cookies', (req, res) => {
	res.cookie('newUser', false);
	res.send('You got the cookies!');
});