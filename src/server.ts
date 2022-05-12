import express from "express"
import morgan from 'morgan'
import cors from 'cors'
import { green } from "colors"
import { UserRouter } from "./router/user.router"


/**
 * @author Carlos Páez
 */
class ServerBootstrap {
    private _app: express.Application = express()
    private _port: number = 8000

    constructor() {
        this._app.use(express.json())
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(morgan('dev'))
        this._app.use(cors())

        this._app.use('/api', this._routers())

        this._listen()
    }

    private _routers = (): express.Router[] => {
        return [
            new UserRouter().router
        ]
    }

    private _listen = (): void => {
        this._app.listen(this._port, () => {
            console.log(green(`Server listen on port: ${this._port} \n`))
        })
    }
}

console.clear()
new ServerBootstrap()