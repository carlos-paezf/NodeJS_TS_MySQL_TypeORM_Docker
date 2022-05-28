import { Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../shared/router/router'
import { PurchaseProductController } from './controllers/purchase-product.controller'
import { PurchaseProductMiddleware } from './middlewares/purchase-product.middleware';


/**
 * @author Carlos Páez
 */
export class PurchaseProductRouter extends BaseRouter<PurchaseProductController, PurchaseProductMiddleware> {
    constructor() {
        super(PurchaseProductController, PurchaseProductMiddleware)
    }

    protected routes(): void {
        this.router.get('/purchases-products', this.controller.findAllPurchasesProducts)
        this.router.get('/purchases-products/:id', this.controller.findPurchaseProductById)
        this.router.post(
            '/create-purchase-product', 
            this.middleware.purchaseProductValidator,
            this.controller.createPurchaseProduct
        )
        this.router.put('/update-purchase-product/:id', this.controller.updatePurchaseProduct)
        this.router.delete('/delete-purchase-product/:id', this.controller.deletePurchaseProduct)
    }
}