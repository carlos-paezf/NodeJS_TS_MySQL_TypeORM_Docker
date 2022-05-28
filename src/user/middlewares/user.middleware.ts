import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { UserDTO } from '../dto/user.dto';


/**
 * @author Carlos Páez
 */
export class UserMiddleware {
    constructor(private readonly _httpResponse: HttpResponse = new HttpResponse()) { }

    userValidator(req: Request, res: Response, next: NextFunction) {
        const { name, lastname, username, email, password, city, providence, role } = req.body

        const valid = new UserDTO()

        valid.name = name
        valid.lastname = lastname
        valid.username = username
        valid.email = email
        valid.password = password
        valid.city = city
        valid.providence = providence
        valid.role = role

        validate(valid).then((error) => {
            return error.length ? this._httpResponse.BadRequest(res, error) : next()
        })
    }
}