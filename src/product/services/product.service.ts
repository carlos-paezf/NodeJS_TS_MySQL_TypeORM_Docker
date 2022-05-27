import { BaseService } from "../../config/base.service";
import { ProductDTO } from "../dto/product.dto";
import { ProductEntity } from "../entities/product.entity";
import { UpdateResult, DeleteResult } from 'typeorm';


/**
 * @author Carlos Páez
 */
export class ProductService extends BaseService<ProductEntity> {
    constructor() {
        super(ProductService)
    }

    public async findAllProducts(): Promise<ProductEntity[]> {
        return (await this.execRepository).find()
    }

    public async findProductById(id: string): Promise<ProductEntity | null> {
        return (await this.execRepository).findOneByOrFail({ id })
    }

    public async createProduct(body: ProductDTO): Promise<ProductEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateProduct(id: string, infoUpdate: ProductDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    public async deleteProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }
}