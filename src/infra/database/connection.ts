import { DataSource, DataSourceOptions } from "typeorm";

class ConnectDatabase {
  public _connection: any;

  constructor() {
    const config = {
      type: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ["src/infra/database/entities/**/*.{js,ts}"],
      // logging: true,
      synchronize: true,
    };

    this._connection = new DataSource(config as DataSourceOptions);
  }

}

export default new ConnectDatabase()._connection;