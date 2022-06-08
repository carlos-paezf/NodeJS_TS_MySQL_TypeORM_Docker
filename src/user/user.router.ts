import { BaseRouter } from "../shared/router/router";
import { UserController } from './controllers/user.controller';
import { Request, Response, NextFunction } from 'express';
import { UserMiddleware } from './middlewares/user.middleware';

/**
 * @author Carlos Páez
 */
export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware)
    }

    protected routes(): void {
        this.router.get('/users', this.controller.findAllUsers)
        this.router.get('/user/:id', this.controller.findUserById)

        this.router.post(
            '/create-user',
            this.middleware.userValidator,
            this.controller.createUser
        )
        this.router.post(
            '/register', 
            this.middleware.userValidator, 
            this.controller.createUser
        )

        this.router.put('/update-user/:id', this.controller.updateUser)
        this.router.delete(
            '/delete-user/:id', 
            [this.middleware.passAuth('jwt'), this.middleware.checkAdminRole], 
            this.controller.deleteUser
        )

        this.router.get('/users/relation/:id', this.controller.getUserWithRelation)
    }
}
