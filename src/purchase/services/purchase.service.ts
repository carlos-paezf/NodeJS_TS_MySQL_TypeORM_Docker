import { UpdateResult, DeleteResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { PurchaseDTO } from '../dto/purchase.dto'
import { PurchaseEntity } from '../entities/purchase.entity'


/**
 * @author Carlos Páez
 */
export class PurchaseService extends BaseService<PurchaseEntity> {
    constructor() {
        super(PurchaseEntity)
    }

    public async findAllPurchases(): Promise<PurchaseEntity[]> {
        return (await this.execRepository).find()
    }

    public async findPurchaseById(id: string): Promise<PurchaseEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
        return (await this.execRepository).save(body)
    }

    public async updatePurchase(id: string, infoUpdate: PurchaseDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    public async deletePurchase(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
}