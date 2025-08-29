import { Request, Response } from 'express';
import { getPostsForReview, createReview } from '../services/ReviewService';
import { User } from '../database';


export const getReviewFeedController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    // Get user's current karma
    const user = await User.findByPk(userId, {
      attributes: ['karma']
    });

    const karma = user ? user.get('karma') as number : 0;
    const posts = await getPostsForReview(userId, 2);

    // Check if there are more posts available by trying to get 1 more
    const hasMorePosts = posts.length >= 2;

    res.status(200).json({
      success: true,
      message: 'Posts fetched successfully',
      data: {
        request: posts[0] || null,
        userKarma: karma,
        hasMore: hasMorePosts
      }
    });

  } catch (error) {
    console.error('Error fetching review feed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts for review'
    });
  }
};

export const submitReviewController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const {
      requestId,
      clarityScore,
      credibilityScore,
      engagementScore,
      feedbackTags,
      overallFeedback
    } = req.body;

    // Validate required fields
    if (!requestId || !clarityScore || !credibilityScore || !engagementScore) {
      return res.status(400).json({
        success: false,
        error: 'Request ID and all scores are required'
      });
    }

    // Validate score ranges
    if (
      clarityScore < 1 || clarityScore > 5 ||
      credibilityScore < 1 || credibilityScore > 5 ||
      engagementScore < 1 || engagementScore > 5
    ) {
      return res.status(400).json({
        success: false,
        error: 'All scores must be between 1 and 5'
      });
    }

    const review = await createReview({
      requestId,
      reviewerId: userId,
      clarityScore,
      credibilityScore,
      engagementScore,
      feedbackTags,
      overallFeedback
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      review: review,
      karmaEarned: 10
    });

  } catch (error) {
    console.error('Error submitting review:', error);

    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string' &&
      (
        (error as any).message.includes('already reviewed') ||
        (error as any).message.includes('cannot review your own') ||
        (error as any).message.includes('Request not found')
      )
    ) {
      return res.status(400).json({
        success: false,
        error: (error as any).message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to submit review'
    });
  }
};