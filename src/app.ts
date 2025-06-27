import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import MongoDB from "./dbs/databases";
import { checkOverload } from "./helpers/check_connect";
import dotenv from "dotenv";
dotenv.config();
import config from "./configs/config";
import MainRouter from "./routes";
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.connectDatabase();
  }
  private middleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(helmet());
    this.app.use(compression());
  }
  private routes(): void {
    this.app.use("/v1/api", MainRouter.getInstance());
  }
  private async connectDatabase(): Promise<void> {
    try {
      const url = `mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.db_name}?authSource=shopDev`;

      await MongoDB.connect(url);
      // checkOverload()
    } catch (err) {
      console.log(err);
    }
  }
}

export default new App().app;
