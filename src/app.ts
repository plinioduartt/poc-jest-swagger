import express from 'express';
import path from 'path';
import routes from './routes';
import "reflect-metadata"
import connection from './infra/database/connection';
import dotenv from 'dotenv';

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
  }

  private route() {
    this._express.use(routes);
  }
}

export default new App()._express;