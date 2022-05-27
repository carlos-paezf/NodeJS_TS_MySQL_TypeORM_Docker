import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";


/**
 * @author Carlos Páez
 */
export class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRepository: Promise<Repository<T>>

    constructor(private _getEntity: EntityTarget<T>) {
        super()
        this.execRepository = this.initRepository(_getEntity)
    }

    /**
     * This function returns a repository of the entity passed to it.
     * @param entity - EntityTarget<T>
     * @returns A promise that resolves to a Repository<T>
     */
    public async initRepository<T>(entity: EntityTarget<T>): Promise<Repository<T>> {
        const getConnection = await this.dbConnection
        return getConnection.getRepository(entity)
    }
}