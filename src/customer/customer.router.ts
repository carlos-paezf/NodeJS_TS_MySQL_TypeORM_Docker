import { NextFunction, Request, Response } from 'express'
import { BaseRouter } from '../shared/router/router'
import { CustomerController } from './controllers/customer.controller'
import { CustomerMiddleware } from './middlewares/customer.middleware'


/**
 * @author Carlos Páez
 */
export class CustomerRouter extends BaseRouter<CustomerController, CustomerMiddleware> {
    constructor() {
        super(CustomerController, CustomerMiddleware)
    }

    protected routes(): void {
        this.router.get('/customers', (req: Request, res: Response) => this.controller.findAllCustomers(req, res))
        this.router.get('/customers/:id', (req: Request, res: Response) => this.controller.findCustomerById(req, res))
        this.router.post(
            '/create-customer', 
            (req: Request, res: Response, next: NextFunction) => this.middleware.customerValidator(req, res, next),
            (req: Request, res: Response) => this.controller.createCustomer(req, res)
        )
        this.router.put('/update-customer/:id', (req: Request, res: Response) => this.controller.updateCustomer(req, res))
        this.router.delete('/delete-customer/:id', (req: Request, res: Response) => this.controller.deleteCustomer(req, res))
    }
}