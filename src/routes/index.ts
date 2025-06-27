
import {Router} from 'express'
import SignUpRouter from "./access/index.access"
import checkAuth from '../utils/checkAuth'

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
        router.use(checkAuth.apiKey)
        router.use(checkAuth.permission('0000'))
        router.use("/", SignUpRouter.getRouter())
    }
  }

  export default MainRouter
  