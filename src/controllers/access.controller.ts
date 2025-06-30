import { Response, Request, NextFunction } from "express";
import AccessService from "../services/access.service";
import { Created } from "../helpers/sucsses.response";

class AccessController {
  public async login (req: Request, res: Response, next: NextFunction): Promise<void>{
    const {email, password} = req.body
    new Created({
      message: 'Login success!',
      metadata: await AccessService.login(email, password)
    }).send(res)
  }

  public async logout (req: Request, res: Response, next: NextFunction) : Promise<void>{
    new Created({
      message: 'Logout Success!',
      metadata : await AccessService.logout(req.keyStore)
    }).send(res)
  }

  public async signUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, email, password } = req.body;
    new Created({
        message: 'Registered OK!',
        metadata : await AccessService.signUp(name, email, password)
    }).send(res)
  }
}

export default new AccessController();
