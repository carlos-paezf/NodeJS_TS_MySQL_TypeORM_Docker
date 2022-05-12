import express from "express"
import morgan from 'morgan'
import cors from 'cors'
import { green } from "colors"


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
        this.listen()
    }

    public listen = (): void => {
        this._app.listen(this._port, () => {
            console.log(green(`Server listen on port: ${this._port}`))
        })
    }
}

console.clear()
new ServerBootstrap()