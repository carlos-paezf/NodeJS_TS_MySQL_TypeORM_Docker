import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { UserEntity } from '../../user/entities/user.entity';


/**
 * @author Carlos Páez
 */
export class CustomerDTO extends BaseDTO {
    @IsNotEmpty()
    address!: string

    @IsNotEmpty()
    dni!: string

    @IsNotEmpty()
    user!: UserEntity
}
