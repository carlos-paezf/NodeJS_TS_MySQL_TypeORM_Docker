import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";


/**
 * @author Carlos Páez
 */
export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity)
    }

    public async findAllUsers(): Promise<UserEntity[]> {
        return (await this.execRepository).find()
    }

    public async findUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async createUser(body: UserDTO): Promise<UserEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
}