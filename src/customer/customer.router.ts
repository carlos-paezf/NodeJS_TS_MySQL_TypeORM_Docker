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
        this.router.get('/customers', this.controller.findAllCustomers)
        this.router.get('/customers/:id', this.controller.findCustomerById)
        this.router.post(
            '/create-customer', 
            this.middleware.customerValidator,
            this.controller.createCustomer
        )
        this.router.put('/update-customer/:id', this.controller.updateCustomer)
        this.router.delete('/delete-customer/:id', this.controller.deleteCustomer)
    }
}