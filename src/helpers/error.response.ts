const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409
}

const ResponseStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error'
}

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

export {
    ConflictRequestError,
    BadRequestError
}