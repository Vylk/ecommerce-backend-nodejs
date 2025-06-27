import { Router, Request, Response, NextFunction } from "express";
import { IRouter } from "../../interfaces/IRoutes"
import AccessController from "../../controllers/access.controller";
import {asyncHandlerError} from '../../utils/checkAuth'

class SignUpRouter implements IRouter{
    private router: Router;
    constructor(){
        this.router = Router()
        this.setUpRouter()
    }
    private setUpRouter(): void{
        this.router.post("/signup", asyncHandlerError(AccessController.signUp))
    }

    public getRouter(): Router{
        return this.router
    }
}
export default new SignUpRouter();