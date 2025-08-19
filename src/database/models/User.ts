import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please provide a valid email address.',
      },
    },
    set(value: string) {
      this.setDataValue('email', value.toLowerCase());
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  googleId: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  linkedinId: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  fullName: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default User;
