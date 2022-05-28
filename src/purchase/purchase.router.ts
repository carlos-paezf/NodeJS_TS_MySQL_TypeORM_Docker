import { Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../shared/router/router'
import { PurchaseController } from './controllers/purchase.controller'
import { PurchaseMiddleware } from './middlewares/purchase.middleware';


/**
 * @author Carlos Páez
 */
export class PurchaseRouter extends BaseRouter<PurchaseController, PurchaseMiddleware> {
    constructor() {
        super(PurchaseController, PurchaseMiddleware)
    }

    protected routes(): void {
        this.router.get('/purchases', this.controller.findAllPurchases)
        this.router.get('/purchases/:id', this.controller.findPurchaseById)
        this.router.post(
            '/create-purchase', 
            this.middleware.purchaseValidator,
            this.controller.createPurchase
        )
        this.router.put('/update-purchase/:id', this.controller.updatePurchase)
        this.router.delete('/delete-purchase/:id', this.controller.deletePurchase)
    }
}