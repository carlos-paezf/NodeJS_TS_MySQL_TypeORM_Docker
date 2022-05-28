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
        this.router.get('/products', this.controller.findAllProducts)
        this.router.get('/products/:id', this.controller.findProductById)
        this.router.post(
            '/create-product',
            this.middleware.productValidator,
            this.controller.createProduct
        )
        this.router.put('/update-product/:id', this.controller.updateProduct)
        this.router.delete('/delete-product/:id', this.controller.deleteProduct)
    }
}