import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { red } from 'colors';
import { HttpResponse } from "../../shared/response/http.response";


/**
 * @author Carlos Páez
 */
export class ProductController {
    constructor(
        private readonly _productService: ProductService = new ProductService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }

    public async findAllProducts(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._productService.findAllProducts()

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in ProductController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async findProductById(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._productService.findProductById(id)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in ProductController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async createProduct(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._productService.createProduct({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red('Error in ProductController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._productService.updateProduct(id, { ...req.body })

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in ProductController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._productService.deleteProduct(id)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in ProductService: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}