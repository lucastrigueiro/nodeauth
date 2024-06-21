import 'dotenv/config';
import express from 'express';
import route from './route';
import { appValues } from './config/constants/constants';

const { msPort } = appValues;

const app = express();
route(app);

app.listen(msPort, () => {
  console.log(`Server is running on port ${msPort}`);
});
