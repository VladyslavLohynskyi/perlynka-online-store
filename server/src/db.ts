import { Sequelize } from 'sequelize';

console.log(process.env.DATABASE_URL);
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
   dialect: 'postgres',
   protocol: 'postgres',
});
