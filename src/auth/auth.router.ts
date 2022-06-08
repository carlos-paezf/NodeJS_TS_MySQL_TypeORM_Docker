import { Request, Response } from 'express'
import { SharedMiddleware } from '../shared/middlewares/shared.middleware'
import { BaseRouter } from '../shared/router/router'
import { AuthController } from './controllers/auth.controller'


/**
 * @author Carlos Páez
 */
export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
    constructor() {
        super(AuthController, SharedMiddleware)
    }

    protected routes(): void {
        this.router.post('/login', this.middleware.passAuth("login"), this.controller.login)
    }
}   