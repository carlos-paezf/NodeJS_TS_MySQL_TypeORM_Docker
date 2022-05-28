import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { CustomerDTO } from '../dto/customer.dto'


/**
 * @author Carlos Páez
 */
export class CustomerMiddleware {
    constructor(private readonly _httpResponse: HttpResponse = new HttpResponse()) { }

    customerValidator(req: Request, res: Response, next: NextFunction) {
        const { address, dni, user } = req.body

        const valid = new CustomerDTO()

        valid.address = address
        valid.dni = dni
        valid.user = user

        validate(valid).then((error) => {
            return error.length ? this._httpResponse.BadRequest(res, error) : next()
        })
    }
}