import { BaseRouter } from "../shared/router/router"
import { CategoryController } from "./controllers/category.controller"
import { Request, Response, NextFunction } from 'express';
import { CategoryMiddleware } from "./middlewares/category.middleware";


/**
 * @author Carlos Páez
 */
export class CategoryRouter extends BaseRouter<CategoryController, CategoryMiddleware> {
    constructor() {
        super(CategoryController, CategoryMiddleware)
    }

    protected routes(): void {
        this.router.get('/categories', this.controller.findAllCategories)
        this.router.get('/categories/:id', this.controller.findCategoryById)
        this.router.post(
            '/create-category',
            this.middleware.categoryValidator,
            this.controller.createCategory
        )
        this.router.put('/update-category/:id', this.controller.updateCategory)
        this.router.delete('/delete-category/:id', this.controller.deleteCategory)
    }
}