import express, { Application, Router } from 'express';

export function createServer(userController: Router): Application {
  const app = express();

  app.use(express.json());
  app.use(express.static('public'));

  app.use('/api/auth', userController);

  return app;
}
