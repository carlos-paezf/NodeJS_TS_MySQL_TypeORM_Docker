import { IsNotEmpty } from 'class-validator'
import { BaseDTO } from '../../config/base.dto'
import { CustomerEntity } from '../../customer/entities/customer.entity';


/**
 * @author Carlos Páez
 */
export class PurchaseDTO extends BaseDTO {
    @IsNotEmpty()
    status!: string

    @IsNotEmpty()
    paymentMethod!: string

    @IsNotEmpty()
    customer!: CustomerEntity
}