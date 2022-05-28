import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controller";
import { Request, Response, NextFunction } from 'express';
import { ProductMiddleware } from "./middlewares/product.middleware";


/**
 * @author Carlos Páez
 */
export class ProductRouter extends BaseRouter<ProductController, ProductMiddleware> {
    constructor() {
        super(ProductController, ProductMiddleware)
    }

    protected routes(): void {
        this.router.get('/products', (req: Request, res: Response) => this.controller.findAllProducts(req, res))
        this.router.get('/products/:id', (req: Request, res: Response) => this.controller.findProductById(req, res))
        this.router.post(
            '/create-product',
            (req: Request, res: Response, next: NextFunction) => this.middleware.productValidator(req, res, next),
            (req: Request, res: Response) => this.controller.createProduct(req, res)
        )
        this.router.put('/update-product/:id', (req: Request, res: Response) => this.controller.updateProduct(req, res))
        this.router.delete('/delete-product/:id', (req: Request, res: Response) => this.controller.deleteProduct(req, res))
    }
}