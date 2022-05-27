import { Request, Response } from 'express';
import { red } from 'colors';
import { PurchasesProductsService } from '../services/purchases-products.service';
import { HttpResponse } from '../../shared/response/http.response';


/**
 * @author Carlos Páez
 */
export class PurchasesProductsController {
    constructor(
        private readonly _purchasesProductsService: PurchasesProductsService = new PurchasesProductsService(),
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

    public async findPurchasesProductsById(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._purchasesProductsService.findPurchasesProductsById(id)

            if (!data) return this._httpResponse.BadRequest(res, `No hay resultados para el id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchasesProductsController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async createPurchasesProducts(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._purchasesProductsService.createPurchasesProducts({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red('Error in PurchasesProductsController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async updatePurchasesProducts(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._purchasesProductsService.updatePurchasesProducts(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchasesProductsController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async deletePurchasesProducts(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._purchasesProductsService.deletePurchasesProducts(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchasesProductsController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}