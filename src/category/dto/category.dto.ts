import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";


/**
 * @author Carlos Páez
 */
export class CategoryDTO extends BaseDTO {
    @IsNotEmpty()
    categoryName!: string
}