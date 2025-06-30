import {Response} from 'express'
import {statusCode as StatusCode, reasonPhrases as ResponseStatusCode} from '../utils/httpStatusCode'

class SuccessResponse {
    public messgae: string
    public statuscode: number
    public metadata : any
    constructor({message = '', statusCode = StatusCode.OK, reasonStatusCode = ResponseStatusCode.OK, metadata = {} }: {message?: string, statusCode: number, reasonStatusCode?: string, metadata: any}){
        this.messgae = !message ? reasonStatusCode : message
        this.statuscode = statusCode
        this.metadata = metadata
    }
    send(res: Response, header = {}){
        return res.status(this.statuscode).json(this)
    }
}
class OK extends SuccessResponse {
    constructor({message = 'Success', metadata = {}}: {message: string, metadata : any}){
            super({message, statusCode: 200, metadata})
    }
}

class Created extends SuccessResponse{
    public options: any
    constructor({options = {},message, statusCode = StatusCode.CREATED, reasonStatusCode=ResponseStatusCode.CREATED, metadata = {}} : {options?: any,message: string, statusCode?: number, reasonStatusCode?: string, metadata : any}){
        super({message, statusCode,metadata})
        this.options = !options ? {} : options
    }
}


export {
    OK,
    Created
}