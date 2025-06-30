import {statusCode as StatusCode, reasonPhrases as ResponseStatusCode} from '../utils/httpStatusCode'


class ErrorResponse extends Error {
    public status: number
    constructor(message: string, status: number){
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse{
    constructor(message = ResponseStatusCode.CONFLICT, status = StatusCode.CONFLICT){
        super(message,status)
    }
}

class BadRequestError extends ErrorResponse{
    constructor(message = ResponseStatusCode.FORBIDDEN, status = StatusCode.FORBIDDEN){
        super(message,status)
    }
}
class AuthFailureError extends ErrorResponse {
    constructor (message = ResponseStatusCode.UNAUTHORIZED, status = StatusCode.UNAUTHORIZED){
        super(message, status)
    }
}
class NotFoundError extends ErrorResponse {
    constructor (message = ResponseStatusCode.NOT_FOUND, status = StatusCode.NOT_FOUND){
        super(message, status)
    }
}

export {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError
}