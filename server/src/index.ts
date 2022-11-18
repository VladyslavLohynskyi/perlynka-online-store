import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { sequelize } from './db';
const models = require('./models/models');
import { router } from './routes/index';

const app: Application = express();
const port: number = Number(process.env.PORT) || 8888;

app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
   try {
      await sequelize.authenticate();
   } catch (error) {
      console.log('DB authenticate Error');
   }
   try {
      await await sequelize.sync();
   } catch (error) {
      console.log('DB synchronization Error');
   }
   try {
      app.listen(port, () => {
         console.log(`Connected successfully on port ${port}`);
      });
   } catch (error) {
      console.log('Connecting Error');
   }
};

start();
