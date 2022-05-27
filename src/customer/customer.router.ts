import { Request, Response } from 'express'
import { BaseRouter } from '../shared/router/router'
import { CustomerController } from './controllers/customer.controller'


/**
 * @author Carlos Páez
 */
export class CustomerRouter extends BaseRouter<CustomerController> {
    constructor() {
        super(CustomerController)
    }

    protected routes(): void {
        this.router.get('/customers', (req: Request, res: Response) => this.controller.findAllCustomers(req, res))
        this.router.get('/customers/:id', (req: Request, res: Response) => this.controller.findCustomerById(req, res))
        this.router.post('/create-customer', (req: Request, res: Response) => this.controller.createCustomer(req, res))
        this.router.put('/update-customer/:id', (req: Request, res: Response) => this.controller.updateCustomer(req, res))
        this.router.delete('/delete-customer/:id', (req: Request, res: Response) => this.controller.deleteCustomer(req, res))
    }
}