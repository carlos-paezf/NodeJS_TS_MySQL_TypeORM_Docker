import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controller";
import { Request, Response } from 'express';


/**
 * @author Carlos Páez
 */
export class ProductRouter extends BaseRouter<ProductController> {
    constructor() {
        super(ProductController)
    }

    protected routes(): void {
        this.router.get('/products', (req: Request, res: Response) => this.controller.findAllProducts(req, res))
        this.router.get('/products/:id', (req: Request, res: Response) => this.controller.findProductById(req, res))
        this.router.post('/create-product', (req: Request, res: Response) => this.controller.createProduct(req, res))
        this.router.put('/update-product/:id', (req: Request, res: Response) => this.controller.updateProduct(req, res))
        this.router.delete('/delete-product/:id', (req: Request, res: Response) => this.controller.deleteProduct(req, res))
    }
}