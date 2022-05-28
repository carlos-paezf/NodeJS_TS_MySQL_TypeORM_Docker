import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { ProductDTO } from '../dto/product.dto'


/**
 * @author Carlos Páez
 */
export class ProductMiddleware {
    constructor(private readonly _httpResponse: HttpResponse = new HttpResponse()) { }

    public productValidator = (req: Request, res: Response, next: NextFunction) => {
        const { productName, description, price, category } = req.body

        const valid = new ProductDTO()

        valid.productName = productName
        valid.description = description
        valid.price = price
        valid.category = category

        validate(valid).then((error) => {
            return error.length ? this._httpResponse.BadRequest(res, error) : next()
        })
    }
}