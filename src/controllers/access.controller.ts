import { Response, Request, NextFunction } from "express";
import AccessService from "../services/access.service";
import { Created } from "../helpers/sucsses.response";

class AccessController {
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
