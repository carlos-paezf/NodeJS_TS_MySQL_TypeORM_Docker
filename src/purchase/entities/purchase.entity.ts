import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { PurchasesProductsEntity } from "./purchase-product.entity";
import { CustomerEntity } from '../../customer/entities/customer.entity';


/**
 * @author Carlos Páez
 */
@Entity({ name: 'purchase' })
export class PurchaseEntity extends BaseEntity {
    @Column()
    status!: string

    @Column()
    paymentMethod!: string

    @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
    @JoinColumn({ name: 'customer_id' })
    customer!: CustomerEntity

    @OneToMany(() => PurchasesProductsEntity, (purchaseProduct) => purchaseProduct.purchase)
    purchaseProduct!: PurchasesProductsEntity
}