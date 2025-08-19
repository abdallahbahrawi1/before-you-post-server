import { Sequelize } from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASSWORD as string,
  {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
