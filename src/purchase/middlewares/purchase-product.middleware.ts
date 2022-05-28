import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { PurchaseProductDTO } from '../dto/purchase-product.dto'


/**
 * @author Carlos Páez
 */
export class PurchaseProductMiddleware {
    constructor(private readonly _httpResponse: HttpResponse = new HttpResponse()) { }

    public purchaseProductValidator = (req: Request, res: Response, next: NextFunction) => {
        const { quantityProduct, totalPrice, purchase, product } = req.body

        const valid = new PurchaseProductDTO()

        valid.quantityProduct = quantityProduct
        valid.totalPrice = totalPrice
        valid.purchase = purchase
        valid.product = product

        validate(valid).then((error) => {
            return error.length ? this._httpResponse.BadRequest(res, error) : next()
        })
    }
}