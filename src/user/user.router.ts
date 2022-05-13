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
        this.router.get('/user', (req: Request, res: Response) => this.controller.getUser(req, res))
    }
}
