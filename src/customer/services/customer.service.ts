import { UpdateResult, DeleteResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { CustomerDTO } from '../dto/customer.dto'
import { CustomerEntity } from '../entities/customer.entity'


/**
 * @author Carlos Páez
 */
export class CustomerService extends BaseService<CustomerEntity> {
    constructor() {
        super(CustomerEntity)
    }

    public async findAllCustomers(): Promise<CustomerEntity[]> {
        return (await this.execRepository).find()
    }

    public async findCustomerById(id: string): Promise<CustomerEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async createCustomer(body: CustomerDTO): Promise<CustomerEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateCustomer(id: string, infoUpdate: CustomerDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    public async deleteCustomer(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
}