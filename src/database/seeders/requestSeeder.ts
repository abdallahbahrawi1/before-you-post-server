import Request from '../models/Request';
import { seedUsers } from './userSeeder';
import { makeSampleRequests } from './seed-data/sampleRequests';

export const seedRequests = async () => {
  try {
    // Check if requests already exist
    const existingRequestsCount = await Request.count();
    
    if (existingRequestsCount > 0) {
      console.log('📋 Requests already exist in database, skipping seeding...');
      return;
    }

    console.log('🌱 Seeding requests...');

    // First ensure we have users
    const users = await seedUsers();
    
    if (users.length < 6) {
      throw new Error('Not enough users to create diverse requests');
    }

    // Create requests distributed across different users
    const allRequests: Record<string, any>[] = [];
    
    // Give each user some requests from the sample data
    users.forEach((user, index) => {
      const userId = user.getDataValue('id');
      const userRequests = makeSampleRequests(userId);
      
      // Take different slices for each user to create variety
      const startIndex = (index * 2) % userRequests.length;
      const userSlice = userRequests.slice(startIndex, startIndex + 2);
      
      allRequests.push(...userSlice);
    });

    // Insert the requests
    const createdRequests = await Request.bulkCreate(allRequests);

    console.log(`✅ Successfully seeded ${createdRequests.length} requests across ${users.length} users`);
    return createdRequests;

  } catch (error) {
    console.error('❌ Error seeding requests:', error);
    throw error;
  }
};