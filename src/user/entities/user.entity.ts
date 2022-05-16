import { Exclude } from "class-transformer";
import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from '../../customer/entities/customer.entity';


/**
 * @author Carlos Páez
 */
@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
    @Column()
    name!: string

    @Column()
    lastname!: string

    @Column()
    username!: string

    @Column()
    email!: string

    @Exclude()
    @Column()
    password!: string

    @Column()
    city!: string
    
    @Column()
    providence!: string

    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity
}