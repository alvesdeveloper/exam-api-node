import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { connectDatabase } from './config/db-connection';
import { examRoutes } from './routes/exam.route';
import { laboratoryRoutes } from './routes/laboratory.route';

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDatabase().then(() => {
  app.use('/api', examRoutes), app.use('/api', laboratoryRoutes);
});
