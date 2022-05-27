import { HttpResponse } from "../../shared/response/http.response";
import { CategoryService } from "../services/category.service";
import { Request, Response } from 'express';
import { red } from 'colors';


/**
 * @author Carlos Páez
 */
export class CategoryController {
    constructor(
        private readonly _categoryService: CategoryService = new CategoryService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }

    public async findAllCategories(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._categoryService.findAllCategories()

            if (!data.length) return this._httpResponse.NotFound(res, 'No hay resultados')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in CategoryController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async findCategoryById(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._categoryService.findCategoryById(id)

            if (!data) return this._httpResponse.BadRequest(res, `No hay resultados para el id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in CategoryController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async createCategory(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._categoryService.createCategory({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red('Error in CategoryController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async updateCategory(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._categoryService.updateCategory(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in CategoryController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async deleteCategory(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._categoryService.deleteCategory(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in CategoryController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}