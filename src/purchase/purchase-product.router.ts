import { Request, Response } from 'express'
import { BaseRouter } from '../shared/router/router'
import { PurchaseProductController } from './controllers/purchase-product.controller'


/**
 * @author Carlos Páez
 */
export class PurchaseProductRouter extends BaseRouter<PurchaseProductController> {
    constructor() {
        super(PurchaseProductController)
    }

    protected routes(): void {
        this.router.get('/purchases-products', (req: Request, res: Response) => this.controller.findAllPurchasesProducts(req, res))
        this.router.get('/purchases-products/:id', (req: Request, res: Response) => this.controller.findPurchaseProductById(req, res))
        this.router.post('/create-purchase-product', (req: Request, res: Response) => this.controller.createPurchaseProduct(req, res))
        this.router.put('/update-purchase-product/:id', (req: Request, res: Response) => this.controller.updatePurchaseProduct(req, res))
        this.router.delete('/delete-purchase-product/:id', (req: Request, res: Response) => this.controller.deletePurchaseProduct(req, res))
    }
}