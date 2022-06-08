import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { RoleType } from '../../user/dto/user.dto'
import { UserEntity } from '../../user/entities/user.entity'
import { HttpResponse } from '../response/http.response'


/**
 * @author Carlos Páez
 */
export class SharedMiddleware {
    constructor(public readonly httpResponse: HttpResponse = new HttpResponse()) { }

    passAuth(type: string) {
        return passport.authenticate(type, { session: false })
    }

    checkAdminRole(req: Request, res: Response, next: NextFunction) {
        const user = req.user  as UserEntity
        if (user.role !== RoleType.ADMIN) {
            return this.httpResponse.Unauthorized(res, 'No tienes permiso')
        }
        return next()
    }
}