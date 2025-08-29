import sequelize from '../config/database';

// Import all models
import User from './models/User';
import Request from './models/Request';
import Review from './models/Review';

// Import seeders
import { seedRequests } from './seeders/requestSeeder';
import { seedUsers } from './seeders/userSeeder';


// Define all relationships
User.hasMany(Request, {
  foreignKey: 'userId',
  as: 'requests'
});

Request.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Request.hasMany(Review, {
  foreignKey: 'requestId',
  as: 'reviews'
});

Review.belongsTo(Request, {
  foreignKey: 'requestId',
  as: 'request'
});

User.hasMany(Review, {
  foreignKey: 'reviewerId',
  as: 'reviewsGiven'
});

Review.belongsTo(User, {
  foreignKey: 'reviewerId',
  as: 'reviewer'
});


// Function to initialize database
export const initializeDatabase = async () => {
  try {
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('Connected to the database.');
    
    console.log('Synchronizing database...');
    await sequelize.sync({ alter: true });
    console.log('Database synchronization complete.');

    // Seed data in order
    if (process.env.NODE_ENV !== 'production') {
      console.log('🌱 Starting database seeding...');
      await seedUsers();    // Users first
      await seedRequests(); // Then requests
      console.log('🌱 Database seeding complete!');
    }
    
    
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

// Export models and sequelize instance
export { sequelize, User, Request, Review };