import { Request, sequelize, User } from '../database';

export const getUserRequests = async (userId: number) => {
  return await Request.findAll({
    where: { userId: userId },
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'fullName', 'email', 'karma']
    }],
    order: [['createdAt', 'DESC']]
  });
};

export const getRequestById = async (id: number) => {
  return await Request.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'fullName', 'email', 'karma']
    }]
  });
};

export const createRequest = async (requestData: {
  userId: number;
  title: string;
  description?: string;
  postContent: string;
  contentType: string;
  categories?: string[];
  imageUrl?: string;
  currentPoints?: number;
}) => {
  const transaction = await sequelize.transaction();
  try {
     // Get user's current karma
    const user = await User.findByPk(requestData.userId, {
      attributes: ['karma']
    });

    if (!user) {
      throw new Error('User not found');
    }

    const userKarma = user.getDataValue('karma') as number;

    const requestCost = requestData.currentPoints || 50; // Default cost is 50 points

    if (userKarma < requestCost) {
      throw new Error('Insufficient karma');
    }

    const request = await Request.create(requestData, { transaction });
    // Deduct karma points from user
    await User.decrement('karma', {
      by: requestCost,
      where: { id: requestData.userId },
      transaction
    });

    await transaction.commit();

    return {
      request,
      karmaDeducted: requestCost,
      remainingKarma: userKarma - requestCost
    };

  } catch (error) {
    await transaction.rollback();
    console.error('Error creating request:', error);
    throw error;
  }
};

export const deleteRequest = async (id: number, userId: number) => {
  const request = await Request.findOne({
    where: { id: id, userId: userId } // Only allow user to delete their own requests
  });
  
  if (!request) {
    throw new Error('Request not found or unauthorized');
  }
  
  await Request.destroy({
    where: { id: id }
  });
  
  return true;
};
