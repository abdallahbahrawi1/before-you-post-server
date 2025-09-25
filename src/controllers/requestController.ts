import { Request as ExpressRequest, Response } from 'express';

import {
  getUserRequests,
  getRequestById,
  createRequest,
  deleteRequest
} from '../services/requestService';


export const getUserRequestsController = async (req: ExpressRequest, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const requests = await getUserRequests(userId);

    res.status(200).json({
      success: true,
      message: 'Requests fetched successfully',
      data: {
        requests: requests
      }
    });

  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user requests',
      data: null,
    });
  }
};


export const getRequestByIdController = async (req: ExpressRequest, res: Response) => {
  try {
    const requestId = parseInt(req.params.id);

    if (isNaN(requestId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request ID'
      });
    }

    const request = await getRequestById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Request fetched successfully',
      data: {
        request: request
      }
    });

  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch request',
      date: null,
    });
  }
};

export const createRequestController = async (req: ExpressRequest, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    // Validate required fields
    const { title, postContent, contentType } = req.body;

    if (!title || !postContent || !contentType) {
      return res.status(400).json({
        success: false,
        error: 'Title, post content, and content type are required'
      });
    }

    // Validate title length
    if (title.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Title must be at least 3 characters long'
      });
    }

    const requestData = {
      userId: userId,
      title,
      description: req.body.description,
      postContent,
      contentType,
      categories: req.body.categories,
      imageUrl: req.body.imageUrl,
      currentPoints: req.body.currentPoints || 15, // Default to 15 points
    };

    const newRequest = await createRequest(requestData);

    res.status(201).json({
      success: true,
      message: 'Request created successfully',
      data: {
        request: newRequest.request,
        karmaDeducted: newRequest.karmaDeducted,
        remainingKarma: newRequest.remainingKarma
      }
    });

  } catch (error) {
    console.error('Error creating request:', error);

    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string' && (error as any).message.includes('Insufficient karma')) {
      return res.status(400).json({
        success: false,
        error: (error as any).message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create request'
    });
  }
};

export const deleteRequestController = async (req: ExpressRequest, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const requestId = parseInt(req.params.id);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (isNaN(requestId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request ID'
      });
    }

    await deleteRequest(requestId, userId);

    res.status(200).json({
      success: true,
      message: 'Request deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting request:', error);

    if (error instanceof Error && error.message === 'Request not found or unauthorized') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to delete request'
    });
  }
};