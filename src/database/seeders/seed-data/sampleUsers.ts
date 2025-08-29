// src/database/seeders/seed-data/sampleUsers.ts
export type UserSeed = {
  email: string;
  fullName: string;
  password: string;
  karma: number;
};

export const sampleUsers: UserSeed[] = [
  {
    email: 'abod@gmail.com',
    fullName: 'Abod craft',
    password: '?#2xQ*4ZcJMr*uD',
    karma: 150
  },
  {
    email: 'sarah.johnson@gmail.com',
    fullName: 'Sarah Johnson',
    password: 'password123',
    karma: 250
  },
  {
    email: 'mike.developer@gmail.com',
    fullName: 'Mike Rodriguez',
    password: 'password123',
    karma: 180
  },
  {
    email: 'emma.marketing@gmail.com',
    fullName: 'Emma Thompson',
    password: 'password123',
    karma: 320
  },
  {
    email: 'david.writer@gmail.com',
    fullName: 'David Chen',
    password: 'password123',
    karma: 200
  },
  {
    email: 'lisa.designer@gmail.com',
    fullName: 'Lisa Parker',
    password: 'password123',
    karma: 275
  }
];