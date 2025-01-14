import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
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
if (process.env.MODE === 'production') {
   const keyJsonContent = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
   if (keyJsonContent) {
      const filePath = path.join(__dirname, 'key.json');
      fs.writeFileSync(filePath, keyJsonContent, 'utf8');
   } else {
      console.error('GOOGLE_APPLICATION_CREDENTIALS_JSON is not set');
   }
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

if (process.env.MODE === 'production') {
   app.use(express.static(path.join(__dirname, '../../client/build')));
   app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
   });
}

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
