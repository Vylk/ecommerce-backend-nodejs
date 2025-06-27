import {Response, Request, NextFunction} from 'express'
import AccessService from '../services/access.service'
class AccessController {
    public async signUp( req:Request,res: Response, next: NextFunction):Promise<void>{
        try{
            const {name, email, password} = req.body
            res.status(201).json(await AccessService.signUp(name, email,password))
        }catch(err){
            next(err)
        }
    }
}

export default new AccessController()