import { Router } from "express";

/**
 * @author Carlos Páez
 */
export class BaseRouter<T> {
    public router: Router
    public controller: T

    constructor(TController: { new(): T }) {
        this.router = Router()
        this.controller = new TController()
        
        this.routes()
    }

    protected routes(): void { }
}