# Middleware de Validación de Datos

Debemos verificar que los datos que llegan a nuestro Backend, son los que requerimos, ya que se si llegan a enviar peticiones de manera incorrecta, podríamos llegar a tener una caída en nuestro server. Por el momento, como estamos en desarrollo, estamos usando Nodemon, pero cuando estamos en producción, cualquier error hace que se detenga nuestra api.

Dentro de cada entidad creamos un directorio llamado `middlewares`, por ejemplo, para el caso de los usuarios tenemos una clase de middlewares para la validación de los campos que se ingresan en la petición:

```ts
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { UserDTO } from '../dto/user.dto';

export class UserMiddleware {
    constructor(private readonly _httpResponse: HttpResponse = new HttpResponse()) { }

    userValidator(req: Request, res: Response, next: NextFunction) {
        const { name, lastname, username, email, password, city, providence, role } = req.body

        const valid = new UserDTO()

        valid.name = name
        valid.lastname = lastname
        valid.username = username
        valid.email = email
        valid.password = password
        valid.city = city
        valid.providence = providence
        valid.role = role

        validate(valid).then((error) => {
            return error.length ? this._httpResponse.BadRequest(res, error) : next()
        })
    }
}
```

Luego, necesitamos ir al archivo de la clase `BaseRouter` y añadir el tipo genérico de los middlewares:

```ts
import { Router } from "express";

export class BaseRouter<T, U> {
    ...
    protected middleware: U

    constructor(..., UMiddleware: { new(): U }) {
        ...
        this.middleware = new UMiddleware()
        ...
    }
    ...
}
```

Teniendo listo la base de las rutas, vamos a las rutas especificas y añadimos los middlewares en el segundo parámetro de las función que establece el endpoint y el controlador:

```ts
export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware)
    }

    protected routes(): void {
        ...
        this.router.post(
            '/create-user', 
            (req: Request, res: Response, next: NextFunction) => this.middleware.userValidator(req, res, next), 
            (req: Request, res: Response) => this.controller.createUser(req, res)
        )
        ...
    }
}
```

Debemos hacer lo mismo para las demás entidades.

| Anterior                                                        |                        | Siguiente |
| --------------------------------------------------------------- | ---------------------- | --------- |
| [Relaciones con Servicios y Controladores](P9T1_Relaciones_Servicios_Controladores.md) | [Readme](../README.md) | [Password Hashing y Query Builders](P11T1_Password_Hashing_Query_Builders.md) |
