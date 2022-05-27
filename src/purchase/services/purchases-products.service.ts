import { UpdateResult, DeleteResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { PurchasesProductsDTO } from '../dto/purchases-products.dto'
import { PurchasesProductsEntity } from '../entities/purchases-products.entity'


/**
 * @author Carlos Páez
 */
export class PurchasesProductsService extends BaseService<PurchasesProductsEntity> {
    constructor() {
        super(PurchasesProductsEntity)
    }

    public async findAllPurchasesProducts(): Promise<PurchasesProductsEntity[]> {
        return (await this.execRepository).find()
    }

    public async findPurchasesProductsById(id: string): Promise<PurchasesProductsEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async createPurchasesProducts(body: PurchasesProductsDTO): Promise<PurchasesProductsEntity> {
        return (await this.execRepository).save(body)
    }

    public async updatePurchasesProducts(id: string, infoUpdate: PurchasesProductsDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    public async deletePurchasesProducts(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
}