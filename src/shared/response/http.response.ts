import { Response } from "express";

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500
}

export class HttpResponse {
    public Ok(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: 'Success',
            data
        })
    }

    public Created(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            statusMsg: 'Created',
            data
        })
    }

    public BadRequest(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            statusMsg: 'Bad Request',
            error: data
        })
    }

    public NotFound(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: 'Not Found',
            error: data
        })
    }

    public Unauthorized(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: 'Unauthorized',
            error: data
        })
    }

    public Forbidden(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: 'Forbidden',
            error: data
        })
    }

    public InternalServerError(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: 'Internal Server Error',
            error: data
        })
    }
}