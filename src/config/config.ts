import * as dotenv from 'dotenv'
import { DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'


/**
 * @author Carlos Páez
 */
export abstract class ConfigServer {
    constructor() {
        const nodeNameEnv: string = this.createPathEnv(this.nodeEnv)
        dotenv.config({
            path: nodeNameEnv
        })
    }

    /**
     * It returns the value of the environment variable with the name of the key passed in
     * @param {string} key - The name of the environment variable you want to get.
     * @returns The value of the environment variable.
     */
    protected getEnvironment(key: string) {
        return process.env[key]
    }

    /**
     * It gets the value of the environment variable with the given key, and then converts it to a
     * number
     * @param {string} key - The key of the environment variable you want to get.
     * @returns A number
     */
    protected getNumberEnv(key: string): number {
        return Number(this.getEnvironment(key))
    }

    /**
     * If the environment variable NODE_ENV is set, return it's value, otherwise return an empty
     * string.
     * @returns The value of the environment variable NODE_ENV.
     */
    protected get nodeEnv(): string {
        return this.getEnvironment('NODE_ENV')?.trim() || ''
    }

    /**
     * It takes a string and returns a string.
     * @param {string} path - string - the path to the environment file
     * @returns A string that is the path to the environment file.
     */
    protected createPathEnv(path: string): string {
        const arrEnv: string[] = ['env']
        if (path.length) {
            const stringToArray: string[] = path.split('.')
            arrEnv.unshift(...stringToArray)
        }
        return `.${arrEnv.join('.')}`
    }

    /**
     * It returns a `DataSourceOptions` object that contains the database connection information.
     * The `DataSourceOptions` object is a TypeORM object that contains the database connection
     * information.
     * 
     * The `getEnvironment()` function is a custom function that returns the value of an environment
     * variable.
     * The `getNumberEnv()` function is a custom function that returns the value of an environment
     * variable as a number.
     * The `SnakeNamingStrategy` object is a TypeORM object that converts the names of database tables
     * and columns to snake case.
     * The `synchronize` property is set to true so that TypeORM will automatically synchronize the
     * database with the entities.
     * The `entities` property is set to an array of paths to the entities.
     * The `migrations` property is set to an array
     * 
     * @returns The return type is `DataSourceOptions`.
     */
    protected get configTypeORM(): DataSourceOptions {
        return {
            type: 'mysql',
            host: this.getEnvironment('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            database: this.getEnvironment('DB_DATABASE'),
            username: this.getEnvironment('DB_USER'),
            password: this.getEnvironment('DB_PASSWORD'),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
            synchronize: true,
            logging: true,
            namingStrategy: new SnakeNamingStrategy()
        }
    }
}