import { hash } from "bcrypt";
import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { RoleType, UserDTO } from "../dto/user.dto";
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
        const newUser = (await this.execRepository).create(body)
        const passwordHash = await hash(newUser.password, 10)
        newUser.password = passwordHash
        return (await this.execRepository).save(newUser)
    }

    public async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }

    public async findUserWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.customer', 'customer')
            .where({ id })
            .getOne()
    }

    public async findUserByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where({ email })
            .getOne()
    }

    public async findUserByUsername(username: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where({ username })
            .getOne()
    }

    public async findUserWithRole(id: string, role: RoleType): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .where({ id })
            .andWhere({ role })
            .getOne()
    }
}