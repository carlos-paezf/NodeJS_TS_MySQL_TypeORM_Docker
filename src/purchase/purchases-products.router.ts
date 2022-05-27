import { Request, Response } from 'express'
import { BaseRouter } from '../shared/router/router'
import { PurchasesProductsController } from './controllers/purchases-products.controller'


/**
 * @author Carlos Páez
 */
export class PurchasesProductsRouter extends BaseRouter<PurchasesProductsController> {
    constructor() {
        super(PurchasesProductsController)
    }

    protected routes(): void {
        this.router.get('/purchases-products', (req: Request, res: Response) => this.controller.findAllPurchasesProducts(req, res))
        this.router.get('/purchases-products/:id', (req: Request, res: Response) => this.controller.findPurchasesProductsById(req, res))
        this.router.post('/create-purchases-products', (req: Request, res: Response) => this.controller.createPurchasesProducts(req, res))
        this.router.put('/update-purchases-products/:id', (req: Request, res: Response) => this.controller.updatePurchasesProducts(req, res))
        this.router.delete('/delete-purchases-products/:id', (req: Request, res: Response) => this.controller.deletePurchasesProducts(req, res))
    }
}