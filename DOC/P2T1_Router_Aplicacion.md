# Router de nuestra aplicación

Antes de continuar con el Router de nuestra aplicación, vamos a crear una pequeña configuración antes, en un archivo llamado `tsconfig.build.json`:

```json
{
    "extends": "./tsconfig.json",
    "exclude": ["node_modules", "dist"]
}
```

## Router

Dentro de `src` creamos un directorio llamado `router`, y dentro del mismo un archivo llamado `router.ts` que servirá de bandera para las rutas de nuestra aplicación. Volvemos a nuestro archivo `server.ts` y quitamos la ruta que teníamos quemada, luego creamos una función que tendrá un arreglo de rutas y la cual se será llamada dentro del constructor de la clase:

```ts
class ServerBootstrap {
    ...
    constructor() {
        ...
        this._app.use('/api', this._routers)

        this._listen()
    }

    private _routers = (): express.Router[] => {
        return []
    }
    ...
}
```

Dentro del archivo `router.ts` creamos una clase con 2 tipos genérico, los cuales servirán para identificar el uso de un controlador (`T`) y de un middleware (`U`), dependiendo de la clase que extienda. Por el momento vamos a ignorar el middleware, por lo que solo trabajaremos con el tipo `T`.

```ts
export class BaseRouter<T> { ... }
```

Dentro de esta clase necesitamos definir una propiedad para almacenar la configuración del router, y otra propiedad para el controlador.

```ts
import { Router } from 'express'

export class BaseRouter<T> {
    public router: Router
    public controller: T
}
```

Una vez definidas las propiedades, debemos asignarle un valor a cada una al inicializar la clase, por lo que dentro del constructor le decimos a la propiedad `router` que almacene la configuración de la función `Router()`, y a la propiedad `controller` le definimos que almacene una instancia de una clase genérica, la cual es creada dentro de los parámetros del constructor. Cada que extendemos esta clase, podremos usar la palabra reservada `super()` dentro del constructor de la clase hija:

```ts
export class BaseRouter {
    ...
    constructor(TController: { new(): T }) {
        this.router = Router()
        this.controller = new TController()
    }
}
```

También creamos un método protegido para poder configurar las rutas en las clases hijas:

```ts
export class BaseRouter {
    ...
    constructor(TController: { new(): T }) {
        ...
        this.routes()
    }

    protected routes(): void { }
}
```

Para nuestro ejemplo, creamos un directorio llamado `controllers`, dentro del cual tenemos un controlador para los usuarios:

```ts
import { Request, Response } from "express";

export class UserController {
    public getUser = (req: Request, res: Response) => {
        return res.status(200).json({
            ok: true,
            data: {
                user: "Carlos Páez"
            }
        })
    }
}
```

Luego creamos un archivo dentro del directorio `router`, en el cual tenemos una clase que extiende de `BaseRouter` entregando en remplazo al tipo genérico `T`, el controlador de los usuarios:

```ts
import { BaseRouter } from "./router";
import { UserController } from '../controllers/user.controller';

export class UserRouter extends BaseRouter<UserController> {
    constructor() {
        super(UserController)
    }
}
```

Dentro de la clase llamamos el método heredado para poder configurar el primer endpoint de los usuarios. Usaremos el método `get` para definir la ruta y el controlador a usar, recordando que tanto `router` como `controller` son propiedades que se heredan de `BaseRouter` al usar el método `super()` dentro del constructor:

```ts
export class UserRouter extends BaseRouter<UserController> {
    ...
    protected routes(): void {
        this.router.get('/user', (req: Request, res: Response) => this.controller.getUser(req, res))
    }
}
```

Volvemos a la clase `ServerBootstrap` y definimos como primer elemento del arreglo que se retorna dentro del método `_routers()`, una instancia de la clase `UserRouter` que estará usando su propiedad `router`, es decir que estaremos pasando los endpoints definidos para la entidad de Usuarios:

```ts
class ServerBootstrap {
    ...
    constructor() {
        ...
        this._app.use('/api', this._routers())
        this._listen()
    }

    private _routers = (): express.Router[] => {
        return [
            new UserRouter().router
        ]
    }
}
```

Luego podemos hacer las pruebas dentro del API Client usando la ruta `http://localhost:8000/api/user` con el método GET.

| Anterior                                                                   |                        | Siguiente |
| -------------------------------------------------------------------------- | ---------------------- | --------- |
| [Creando una aplicación de servidor - Parte 2](P1T2_Creando_Aplicacion_Servidor.md) | [Readme](../README.md) | [Configuración de Entorno de nuestra aplicación](P3T1_Configuracion_Entorno.md) |
