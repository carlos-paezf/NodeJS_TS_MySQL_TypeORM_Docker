# Creando una aplicación de servidor - Parte 1

Necesitamos crear la base de nuestro proyecto, para lo cual primero debemos crear el archivo gestor de paquetes (`package.json`). Esto lo hacemos con el siguiente comando:

```txt
npm init -y
```

## Configurar TS en el proyecto

Necesitamos inicializar TypeScript dentro de nuestro proyecto, para lo cual usamos el siguiente comando:

```txt
tsc --init
```

Dentro del archivo `tsconfig.json`, vamos a hacer la siguiente modificación:

```json
{
    "compilerOptions": {
        ...,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        ...,
        "outDir": "./dist",
        ...,
        "strictPropertyInitialization": true, 
        ...,
    }
}
```

## Clase Server

Creamos un archivo llamado `src/server.ts`, dentro del cual configuramos una variable para almacenar la configuración de express y un método para levantar el servidor en cierto puerto:

```ts
import express from "express"
import morgan from 'morgan'
import cors from 'cors'
import { green } from "colors"


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

new ServerBootstrap()
```

## Configuración de Scripts

Dentro del archivo `package.json` configuramos los scripts para levantar el proyecto ya sea en producción o en desarrollo:

```json
{
    ...,
    "scripts": {
        ...,
        "start": "tsc && node dist/server.js"
    },
}
```

Ahora si podemos ir a la consola y ejecutar el siguiente comando:

```txt
npm start
```

| Anterior |                        | Siguiente                                                                           |
| -------- | ---------------------- | ----------------------------------------------------------------------------------- |
|          | [Readme](../README.md) | [Creando una aplicación de servidor - Parte 2](P1T2_Creando_Aplicacion_Servidor.md) |
