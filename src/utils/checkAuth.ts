import e, { Request, Response, NextFunction } from "express";
import ApiKey from "../services/apikey.service";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.header(HEADER.API_KEY)?.toString();
    if (!key) {
      res.status(403).json({
        message: "Forbidden Error",
      });
    } else {
      const objKey = await ApiKey.findById(key);
      if (!objKey) {
        res.status(403).json({
          message: "Forbidden Error",
        });
      } else {
        req.objKey = objKey;
        next();
      }
      //   (req.body as any).objKey = objKey;
    }
  } catch (error) {}
};

const permission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.objKey?.permissions) {
      res.status(403).json({
        message: "Permission denied",
      });
    } else {
      const validPermission = req.objKey?.permissions.includes(permission)
      // const validPermission = permission.every((p:string)=> req.objKey?.permissions.includes(p))
      if (!validPermission) {
        res.status(403).json({
          message: "Permission denied",
        });
      } else{
        next()
      }
    }
  };
};

const asyncHandlerError = (fn : (req: Request, res: Response, next: NextFunction)=> Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) =>{
    fn(req, res,next).catch(next)
  }
}

export {
  apiKey,
  permission,
  asyncHandlerError
};
