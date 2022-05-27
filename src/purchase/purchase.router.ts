import { Request, Response } from 'express'
import { BaseRouter } from '../shared/router/router'
import { PurchaseController } from './controllers/purchase.controller'


/**
 * @author Carlos Páez
 */
export class PurchaseRouter extends BaseRouter<PurchaseController> {
    constructor() {
        super(PurchaseController)
    }

    protected routes(): void {
        this.router.get('/purchases', (req: Request, res: Response) => this.controller.findAllPurchases(req, res))
        this.router.get('/purchases/:id', (req: Request, res: Response) => this.controller.findPurchaseById(req, res))
        this.router.post('/create-purchase', (req: Request, res: Response) => this.controller.createPurchase(req, res))
        this.router.put('/update-purchase/:id', (req: Request, res: Response) => this.controller.updatePurchase(req, res))
        this.router.delete('/delete-purchase/:id', (req: Request, res: Response) => this.controller.deletePurchase(req, res))
    }
}