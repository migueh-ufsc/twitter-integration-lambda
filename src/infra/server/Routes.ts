/** Arquivo pra cadastrar rotas caso exista um server */
import { Express } from 'express';
import { default as UserRouter } from './routes/UserRouter';

export const initRoutes = (app: Express) => {
  app.use('/user', UserRouter);
};
