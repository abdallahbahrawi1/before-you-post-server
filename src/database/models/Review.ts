import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';

const Review = sequelize.define('Review', {
  requestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Requests',
      key: 'id'
    }
  },
  reviewerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id'
    }
  },
  // Clarity scores (1-5)
  clarityScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    },
    comment: 'Clarity rating 1-5'
  },
  // Credibility scores (1-5) 
  credibilityScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    },
    comment: 'Credibility rating 1-5'
  },
  // Engagement scores (1-5)
  engagementScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    },
    comment: 'Engagement rating 1-5'
  },
  // Predefined feedback tags
  feedbackTags: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of selected tags like ["Great hook", "CTA unclear", "Try an emoji"]'
  },
  // Custom overall feedback
  overallFeedback: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Additional custom comments from reviewer'
  },
  // Karma points awarded to reviewer
  karmaAwarded: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    comment: 'Karma points awarded to reviewer for this review'
  }
}, {
  timestamps: true,
});

export default Review;