import { Request, User, Review, sequelize } from '../database';
import { Op } from 'sequelize';

export const getPostsForReview = async (userId: number, limit: number = 2) => {
  try {
    // Get all request IDs that this user has already reviewed
    const reviewedRequestIds = await Review.findAll({
      where: { reviewerId: userId },
      attributes: ['requestId'],
      raw: true
    }).then(reviews => reviews.map((v: any) => v.requestId));

    const availableRequests = await Request.findAll({
      where: {
        userId: { [Op.ne]: userId }, // Not user's own posts
        id: { [Op.notIn]: reviewedRequestIds }, // Not already reviewed
        status: ['pending_review', 'in_review'], // Only active requests
        currentPoints: { [Op.gt]: 0 } // Still have points available
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'fullName', 'karma']
      }],
      order: [
        // Random order using database function
        [require('sequelize').fn('RAND'), 'ASC'] 
      ],
      limit: limit
    });

    return availableRequests;

  } catch (error) {
    console.error('Error fetching posts for review:', error);
    throw error;
  }
};

export const createReview = async (reviewData: {
  requestId: number;
  reviewerId: number;
  clarityScore: number;
  credibilityScore: number;
  engagementScore: number;
  feedbackTags?: string[];
  overallFeedback?: string;
}) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Check if user already reviewed this request
    const existingReview = await Review.findOne({
      where: {
        requestId: reviewData.requestId,
        reviewerId: reviewData.reviewerId
      }
    });

    if (existingReview) {
      throw new Error('You have already reviewed this request');
    }

    // Get request and request owner
    const request = await Request.findByPk(reviewData.requestId, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'karma']
      }]
    });

    if (!request) {
      throw new Error('Request not found');
    }

    // Prevent users from reviewing their own requests
    if (request.getDataValue('userId') === reviewData.reviewerId) {
      throw new Error('You cannot review your own request');
    }

    // Create the review
    const review = await Review.create({
      ...reviewData,
      karmaAwarded: 10 // Default karma for now
    }, { transaction });

    // Update user's karma
    await User.increment('karma', {
      by: 10,
      where: { id: reviewData.reviewerId },
      transaction
    });

    return review;

  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};
