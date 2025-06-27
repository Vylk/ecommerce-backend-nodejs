import express, { Application, NextFunction,Request,Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import MongoDB from "./dbs/databases";
import { checkOverload } from "./helpers/check_connect";
import { CustomError } from "./interfaces/CustomError";
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
    this.app.use((req: Request, res: Response, next: NextFunction)=>{
      const error = new CustomError('Not Found',404)
      next(error)
    })
    this.app.use((error: CustomError, req: Request, res: Response, next: NextFunction)=>{
      const statusCode = error.status || 500
      res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server error'
      })

    })
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
