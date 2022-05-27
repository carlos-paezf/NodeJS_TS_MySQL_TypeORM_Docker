import { BaseRouter } from "../shared/router/router"
import { CategoryController } from "./controllers/category.controller"
import { Request, Response } from 'express';


/**
 * @author Carlos Páez
 */
export class CategoryRouter extends BaseRouter<CategoryController> {
    constructor() {
        super(CategoryController)
    }

    protected routes(): void {
        this.router.get('/categories', (req: Request, res: Response) => this.controller.findAllCategories(req, res))
        this.router.get('/categories/:id', (req: Request, res: Response) => this.controller.findCategoryById(req, res))
        this.router.post('/create-category', (req: Request, res: Response) => this.controller.createCategory(req, res))
        this.router.put('/update-category/:id', (req: Request, res: Response) => this.controller.updateCategory(req, res))
        this.router.delete('/delete-category/:id', (req: Request, res: Response) => this.controller.deleteCategory(req, res))
    }
}