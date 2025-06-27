import {Response} from 'express'

const StatusCode = {
    OK: 200,
    CREATE: 201
}

const ReasonStatusCode = {
    OK: 'Success',
    CREATE: 'Created'
}

class SuccessResponse {
    public messgae: string
    public statuscode: number
    public metadata : any
    constructor({message = '', statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {} }: {message?: string, statusCode: number, reasonStatusCode?: string, metadata: any}){
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
    constructor({options = {},message, statusCode = StatusCode.CREATE, reasonStatusCode=ReasonStatusCode.CREATE, metadata = {}} : {options?: any,message: string, statusCode?: number, reasonStatusCode?: string, metadata : any}){
        super({message, statusCode,metadata})
        this.options = !options ? {} : options
    }
}

export {
    OK,
    Created
}