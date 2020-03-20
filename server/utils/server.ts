import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(
      cors({
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: [
          'Authorization',
          'Origin',
          'X-Requested-With',
          'Content-Type',
          'Accept',
          'X-Access-Token',
        ],
      }),
    );
    this.setupRoutes();
  }

  public getApp() {
    return this.app;
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  }

  private setupRoutes() {
    routes.forEach(({ handler, type, path }) =>
      this.app[type](`/.netlify/functions/${path}`, handler),
    );
  }
}

export default new Server();
