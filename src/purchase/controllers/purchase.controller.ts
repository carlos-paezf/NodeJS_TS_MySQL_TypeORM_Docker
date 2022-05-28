import { Request, Response } from 'express';
import { red } from 'colors';
import { PurchaseService } from '../services/purchase.service';
import { HttpResponse } from '../../shared/response/http.response';


/**
 * @author Carlos Páez
 */
export class PurchaseController {
    constructor(
        private readonly _purchaseService: PurchaseService = new PurchaseService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }

    public findAllPurchases = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._purchaseService.findAllPurchases()

            if (!data.length) return this._httpResponse.NotFound(res, 'No hay resultados')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchaseController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findPurchaseById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data = await this._purchaseService.findPurchaseById(id)

            if (!data) return this._httpResponse.BadRequest(res, `No hay resultados para el id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchaseController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public createPurchase = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._purchaseService.createPurchase({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red('Error in PurchaseController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updatePurchase = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data = await this._purchaseService.updatePurchase(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchaseController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public deletePurchase = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data = await this._purchaseService.deletePurchase(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in PurchaseController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}