# Configuración de Entorno de nuestra aplicación

Vamos a crear un nuevo directorio dentro de `src` llamado `config` dentro del cual estará el archivo `config.ts` (Más adelante definimos el cuerpo del mismo).

## Script para producción

Creamos un nuevo script dentro del `package.json`, con el fin de ejecutarlo en producción. El ideal es setear la variable de entorno `NODE_ENV` para que adopte las variables del archivo `.production.env` y luego correr el comando `npm start`:

```json
{
    ...,
    "scripts": {
        ...,
        "start:prod": "SET NODE_ENV=production && npm start"
    },
}
```

## Variables de Entorno

Creamos los archivos `.env` y `.production.env`, en los cuales definimos las variables de entorno para desarrollo y producción, por ejemplo el puerto:

```txt
PORT = 8000
```

Dentro del archivo `config.ts` nos vamos a encargar de traer los valores de las variables de entorno, razón por la cual declaramos una clase abstracta para evitar crear instancias pero que si pueda utilizar cuando se hacer herencia de la misma. Dentro de esta clase creamos un método que se encarga de obtener el valor de una variable de entorno que se ingresa por parámetro:

```ts
export abstract class ConfigServer { 
    protected getEnvironment(key: string) {
        return process.env[key]
    }
}
```

Posteriormente, creamos una función para obtener el valor numérico de una variable de entorno:

```ts
export abstract class ConfigServer { 
    ...
    protected getNumberEnv(key: string): number {
        return Number(this.getEnvironment(key))
    }
}
```

También tenemos una función para el valor de la variable de entorno llamada `NODE_ENV`, la cual usamos anteriormente dentro del script de producción, y en caso de que su valor sea `undefined`, retornamos un string vacío.

```ts
export abstract class ConfigServer { 
    ...
    protected get nodeEnv(): string {
        return this.getEnvironment('NODE_ENV')?.trim() || ''
    }
}
```

Por último tenemos un método para retornar un string con el path de las variables de entorno, por defecto será `.env`, pero en caso de tener otro path, se añadirá al principio del string (esto lo hacemos mediante la función `Array.prototype.unshift()`), tal es el caso de `.production.env`.

```ts
export abstract class ConfigServer {
    ...
    protected createPathEnv(path: string): string {
        const arrEnv: string[] = ['env']
        if (path.length) {
            const stringToArray: string[] = path.split('.')
            arrEnv.unshift(...stringToArray)
        }
        return `.${arrEnv.join('.')}`
    }
}
```

Teniendo listos los métodos base, procedemos a crear el método constructor con una variable que contendrá la ruta del archivo de variables de entorno (por defecto `.env`), y luego asignamos dicho valor a la función `config()` de la librería `dotenv`.

```ts
import * as dotenv from 'dotenv'

export abstract class ConfigServer {
    constructor() {
        const nodeNameEnv: string = this.createPathEnv(this.nodeEnv)
        dotenv.config({
            path: nodeNameEnv
        })
    }
    ...
}
```

Regresamos a la clase `ServerBootstrap`, y aplicamos la herencia de la clase `ConfigServer`. Dentro del constructor llamamos todos los métodos y propiedades heredados mediante `super()`, y luego traemos el valor numérico de la variable de entorno del puerto:

```ts
...
import { ConfigServer } from "./config/config"

class ServerBootstrap extends ConfigServer {
    ...
    private _port: number = this.getNumberEnv('PORT') || 8000

    constructor() {
        super()
        ...
    }
    ...
}
```

Cuando ejecutamos el comando `npm run start:dev`, el puerto que se escucha es el definido dentro del archivo `.env`, y cuando lanzamos el comando `npm run start:prod`, el puerto cambia al definido en el archivo `.production.env`

| Anterior                                             |                        | Siguiente |
| ---------------------------------------------------- | ---------------------- | --------- |
| [Router de la Aplicación](P2T1_Router_Aplicacion.md) | [Readme](../README.md) | [Docker Compose y TypeORM (Base de Datos)](P4T1_Docker_Compose_TypeORM.md) |
