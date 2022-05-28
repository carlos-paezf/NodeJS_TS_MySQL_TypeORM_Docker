import { Router } from "express";

/**
 * @author Carlos Páez
 */
export class BaseRouter<T, U> {
    protected router: Router
    protected controller: T
    protected middleware: U

    constructor(TController: { new(): T }, UMiddleware: { new(): U }) {
        this.router = Router()
        this.controller = new TController()
        this.middleware = new UMiddleware()
        
        this.routes()
    }

    protected routes(): void { }
}