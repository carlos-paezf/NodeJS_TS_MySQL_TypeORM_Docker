import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../../shared/middlewares/shared.middleware';
import { UserDTO } from '../dto/user.dto';


/**
 * @author Carlos Páez
 */
export class UserMiddleware extends SharedMiddleware {
    constructor() { 
        super()
    }

    public userValidator = (req: Request, res: Response, next: NextFunction) => {
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
            return error.length ? this.httpResponse.InternalServerError(res, error) : next()
        })
    }
}