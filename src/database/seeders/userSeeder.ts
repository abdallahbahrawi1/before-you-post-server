import User from '../models/User';
import bcrypt from 'bcrypt';
import { sampleUsers } from './seed-data/sampleUsers';

export const seedUsers = async () => {
  try {
    // Check if users already exist
    const existingUsersCount = await User.count();
    
    if (existingUsersCount > 1) { // More than just the admin user
      console.log('👥 Users already exist in database, skipping seeding...');
      return await User.findAll(); // Return existing users
    }

    console.log('🌱 Seeding users...');
    
    const usersToCreate = [];
    
    for (const userData of sampleUsers) {
      // Check if individual user exists
      const existingUser = await User.findOne({ 
        where: { email: userData.email } 
      });
      
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        usersToCreate.push({
          ...userData,
          password: hashedPassword
        });
      }
    }

    let createdUsers = [];
    if (usersToCreate.length > 0) {
      createdUsers = await User.bulkCreate(usersToCreate);
      console.log(`✅ Successfully seeded ${createdUsers.length} users`);
    }

    // Return all users (existing + newly created)
    return await User.findAll();

  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};