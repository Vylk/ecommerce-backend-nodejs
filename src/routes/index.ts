
import {Router} from 'express'
import AccessRouter from "./access/index.access"
import {apiKey, permission} from '../utils/checkAuth'

class MainRouter {
    private static _instance: Router;
  
    public static getInstance(): Router {
      if (!MainRouter._instance) {
        const router = Router();
        MainRouter.initialRouter(router)
        MainRouter._instance = router;
      }
      return MainRouter._instance;
    }

    // Check api key

    private static initialRouter(router: Router): void{
        router.get("/", (req,res,next)=>{
            res.status(200).send("OK")
        })
        router.use(apiKey)
        router.use(permission('0000'))
        router.use("/", AccessRouter.getRouter())
    }
  }

  export default MainRouter
  