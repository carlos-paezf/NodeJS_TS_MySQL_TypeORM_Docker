import 'reflect-metadata'
import express from "express"
import morgan from 'morgan'
import cors from 'cors'
import { blue, green, red } from 'colors';
import { UserRouter } from "./user/user.router"
import { ConfigServer } from "./config/config"
import { ProductRouter } from "./product/product.router"
import { DataSource } from 'typeorm';
import { CategoryRouter } from './category/category.router';
import { PurchaseRouter } from './purchase/purchase.router';
import { CustomerRouter } from './customer/customer.router';
import { PurchaseProductRouter } from './purchase/purchase-product.router';


/**
 * @author Carlos Páez
 */
class ServerBootstrap extends ConfigServer {
    private _app: express.Application = express()
    private _port: number = this.getNumberEnv('PORT') || 8000

    constructor() {
        super()

        this._app.use(express.json())
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(morgan('dev'))
        this._app.use(cors())

        this._dbConnect()

        this._app.use('/api', this._routers())

        this._listen()
    }

    private _routers = (): express.Router[] => {
        return [
            new CategoryRouter().router,
            new CustomerRouter().router,
            new ProductRouter().router,
            new PurchaseRouter().router,
            new PurchaseProductRouter().router,
            new UserRouter().router
        ]
    }

    private async _dbConnect(): Promise<DataSource | void> {
        return this.dbConnection
            .then(() => console.log(blue('> Conexión establecida con la base de datos')))
            .catch((error) => console.log(red('> Error intentando conectar la base de datos: '), error))
    }

    private _listen = (): void => {
        this._app.listen(this._port, () => {
            console.log(green(`Server listen on port: ${this._port} \n`))
        })
    }
}

new ServerBootstrap()