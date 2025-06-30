import { Router} from "express";
import { IRouter } from "../../interfaces/IRoutes"
import AccessController from "../../controllers/access.controller";
import {asyncHandlerError} from '../../helpers/async_handler_error'
import { authentication } from "../../utils/authUtils";

class AccessRouter implements IRouter{
    private router: Router;
    constructor(){
        this.router = Router()
        this.setUpRouter()
    }
    private setUpRouter(): void{
        this.router.post("/signup", asyncHandlerError(AccessController.signUp))
        this.router.post("/login", asyncHandlerError(AccessController.login))
        this.router.use(authentication)
        this.router.post("/logout", asyncHandlerError(AccessController.logout))
    }

    public getRouter(): Router{
        return this.router
    }
}
export default new AccessRouter();