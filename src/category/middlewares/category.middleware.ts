import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { CategoryDTO } from '../dto/category.dto'


/**
 * @author Carlos Páez
 */
export class CategoryMiddleware {
    constructor(private readonly _httpResponse: HttpResponse = new HttpResponse()) { }

    categoryValidator(req: Request, res: Response, next: NextFunction) {
        const { categoryName } = req.body

        const valid = new CategoryDTO()

        valid.categoryName = categoryName

        validate(valid).then((error) => {
            return error.length ? this._httpResponse.BadRequest(res, error) : next()
        })
    }
}