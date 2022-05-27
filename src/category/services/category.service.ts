import { UpdateResult, DeleteResult } from 'typeorm';
import { BaseService } from "../../config/base.service";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryEntity } from "../entities/category.entity";


/**
 * @author Carlos Páez
 */
export class CategoryService extends BaseService<CategoryEntity> {
    constructor() {
        super(CategoryEntity)
    }

    public async findAllCategories(): Promise<CategoryEntity[]> {
        return (await this.execRepository).find()
    }

    public async findCategoryById(id: string): Promise<CategoryEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async createCategory(body: CategoryDTO): Promise<CategoryEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateCategory(id: string, infoUpdate: CategoryDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    public async deleteCategory(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
}