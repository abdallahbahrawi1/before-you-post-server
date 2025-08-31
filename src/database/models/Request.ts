import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

const Request = sequelize.define('Request', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'E.g., How to improve my post?'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Additional context for the request'
  },
  postContent: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'LinkedIn/Twitter post content or draft'
  },
  contentType: {
    type: DataTypes.ENUM('linkedin', 'twitter', 'instagram', 'facebook', 'blog', 'other'),
    allowNull: false,
    defaultValue: 'other'
  },
  tags: { 
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of category tags like ["Career Advice", "Product Launch"]'
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'URL of uploaded image if any'
  },
  currentPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50,
    comment: 'Current points value of this request'
  },
  status: {
    type: DataTypes.ENUM('pending_review', 'in_review', 'completed', 'archived'),
    allowNull: false,
    defaultValue: 'pending_review'
  }
}, {
  timestamps: true,
});

export default Request;
