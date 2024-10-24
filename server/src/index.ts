import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { sequelize } from './db';
import fileUpload from 'express-fileupload';
const models = require('./models/models');
import { router } from './routes/index';
import path from 'path';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/errorMiddleware';
import fs from 'fs';

const app: Application = express();
const port: number = +process.env.PORT || 8888;
const keyJsonContent = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

if (keyJsonContent) {
   const filePath = path.join(__dirname, 'src', 'key.json');
   fs.writeFileSync(filePath, keyJsonContent, 'utf8');
} else {
   console.error('GOOGLE_APPLICATION_CREDENTIALS_JSON is not set');
}

app.use(
   cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
   }),
);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
   try {
      await sequelize.authenticate();
   } catch (error) {
      console.log('DB authenticate Error');
   }
   try {
      await sequelize.sync();
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
