import express from 'express';
import path from 'path';
import routes from './routes';
import "reflect-metadata"
import connection from './infra/database/connection';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import authMiddleware from './app/middlewares/auth';
const swaggerDocs = require('./docs/swagger.json');

dotenv.config();

class App {
  public readonly _express;

  constructor() {
    this._express = express();
    this.route();
    this._express.use(express.urlencoded({ extended: false }));
    this._express.use(express.static(path.join(__dirname, 'public')));

    connection.initialize((err: any) => {
      if (err) console.log("Erro ao conectar com o banco de dados", err)
    });

    this.initSwaggerDocs();
    this.applyMiddlewares();
  }

  private route() {
    this._express.use(routes);
  }

  private initSwaggerDocs() {
    this._express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }

  private applyMiddlewares() {
    this._express.use(authMiddleware.init.bind(authMiddleware));
  }
}

export default new App()._express;