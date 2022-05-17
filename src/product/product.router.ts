import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controller";
import { Request, Response } from 'express';

export class ProductRouter extends BaseRouter<ProductController> {
    constructor() {
        super(ProductController)
    }

    protected routes(): void {
        this.router.get('/products', (req: Request, res: Response) => this.controller.getAllProducts(req, res))
        this.router.get('/product/:id', (req: Request, res: Response) => this.controller.getProductById(req, res))
        this.router.post('/create-product', (req: Request, res: Response) => this.controller.createProduct(req, res))
        this.router.put('/update-product/:id', (req: Request, res: Response) => this.controller.updateProduct(req, res))
        this.router.delete('/delete-product/:id', (req: Request, res: Response) => this.controller.deleteProduct(req, res))
    }
}