import { Request, Response } from 'express';
import { red } from 'colors';
import { PurchaseProductService } from '../services/purchase-product.service';
import { HttpResponse } from '../../shared/response/http.response';


/**
 * @author Carlos Páez
 */
export class PurchaseProductController {
    constructor(
        private readonly _purchasesProductsService: PurchaseProductService = new PurchaseProductService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }

    public async findAllPurchasesProducts(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._purchasesProductsService.findAllPurchasesProducts()

            if (!data.length) return this._httpResponse.NotFound(res, 'No hay resultados')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchasesProductsController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async findPurchaseProductById(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._purchasesProductsService.findPurchaseProductById(id)

            if (!data) return this._httpResponse.BadRequest(res, `No hay resultados para el id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchasesProductsController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async createPurchaseProduct(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._purchasesProductsService.createPurchaseProduct({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red('Error in PurchasesProductsController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async updatePurchaseProduct(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._purchasesProductsService.updatePurchaseProduct(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchasesProductsController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async deletePurchaseProduct(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._purchasesProductsService.deletePurchaseProduct(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchasesProductsController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}