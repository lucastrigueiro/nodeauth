import express from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';
import { errorMiddleware } from '../config/middlewares/errorMiddleware';

const route = app => {

 app.use(express.json()); // Middleware para parsing de JSON

  // Registra as rotas do item do carrinho
  app.use('/auth', authRoute);
  app.use('/user', userRoute);
  app.use(errorMiddleware);

};

export default route;
