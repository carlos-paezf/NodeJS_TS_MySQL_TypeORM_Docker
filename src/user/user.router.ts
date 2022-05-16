import { BaseRouter } from "../shared/router/router";
import { UserController } from './controllers/user.controller';
import { Request, Response } from "express";

/**
 * @author Carlos Páez
 */
export class UserRouter extends BaseRouter<UserController> {
    constructor() {
        super(UserController)
    }

    protected routes(): void {
        this.router.get('/users', (req: Request, res: Response) => this.controller.getAllUsers(req, res))
        this.router.get('/user/:id', (req: Request, res: Response) => this.controller.getUserById(req, res))
        this.router.post('/create-user', (req: Request, res: Response) => this.controller.createUser(req, res))
        this.router.put('/update-user/:id', (req: Request, res: Response) => this.controller.updateUser(req, res))
        this.router.delete('/delete-user/:id', (req: Request, res: Response) => this.controller.deleteUser(req, res))
    }
}
