import { UpdateResult, DeleteResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { ProductService } from '../../product/services/product.service'
import { PurchaseProductDTO } from '../dto/purchase-product.dto'
import { PurchasesProductsEntity } from '../entities/purchase-product.entity'


/**
 * @author Carlos Páez
 */
export class PurchaseProductService extends BaseService<PurchasesProductsEntity> {
    constructor(private readonly _productService: ProductService = new ProductService()) {
        super(PurchasesProductsEntity)
    }

    public async findAllPurchasesProducts(): Promise<PurchasesProductsEntity[]> {
        return (await this.execRepository).find()
    }

    public async findPurchaseProductById(id: string): Promise<PurchasesProductsEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async createPurchaseProduct(body: PurchaseProductDTO): Promise<PurchasesProductsEntity> {
        const newPurchaseProduct = (await this.execRepository).create(body)
        const product = await this._productService.findProductById(newPurchaseProduct.product.id)
        newPurchaseProduct.totalPrice = product!.price * newPurchaseProduct.quantityProduct
        return (await this.execRepository).save(newPurchaseProduct)
    }

    public async updatePurchaseProduct(id: string, infoUpdate: PurchaseProductDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    public async deletePurchaseProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
}