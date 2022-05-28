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
        this.router.get('/users', (req: Request, res: Response) => this.controller.getAllUsers(req, res))
        this.router.get('/user/:id', (req: Request, res: Response) => this.controller.getUserById(req, res))
        this.router.post(
            '/create-user', 
            (req: Request, res: Response, next: NextFunction) => this.middleware.userValidator(req, res, next), 
            (req: Request, res: Response) => this.controller.createUser(req, res)
        )
        this.router.put('/update-user/:id', (req: Request, res: Response) => this.controller.updateUser(req, res))
        this.router.delete('/delete-user/:id', (req: Request, res: Response) => this.controller.deleteUser(req, res))
        this.router.get('/users/relation/:id', (req: Request, res: Response) => this.controller.getUserWithRelation(req, res))
    }
}
