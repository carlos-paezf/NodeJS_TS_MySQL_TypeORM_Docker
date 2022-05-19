# Manejo de Errores y Respuestas

Dentro de la carpeta `shared` creamos un directorio llamado `responses`, en el cual tendremos las respuestas personalizadas dependiendo del código de status. Lo primero será crear un enum para poder tener el nombre de los códigos con su respectivo valor:

```ts
export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500
}
```

Posteriormente, creamos una clase que contendrá los métodos respectivos a los códigos de status.

```ts
import { Response } from "express";

export class HttpResponse {
    public Ok(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: 'Success',
            data
        })
    }

    public Created(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            statusMsg: 'Created',
            data
        })
    }

    public BadRequest(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            statusMsg: 'Bad Request',
            error: data
        })
    }

    public NotFound(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: 'Not Found',
            error: data
        })
    }

    public Unauthorized(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: 'Unauthorized',
            error: data
        })
    }

    public Forbidden(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: 'Forbidden',
            error: data
        })
    }

    public InternalServerError(res: Response, data?: any): Response<unknown> {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: 'Internal Server Error',
            error: data
        })
    }
}
```

Dentro de la clase de cada controlador, hacemos una inyección de dependencias de la clase de respuestas:

```ts
export class UserController {
    constructor(
        private readonly _userService: UserService = new UserService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }
    ...
}
```

Posteriormente, dentro de los métodos del controlador, añadimos las funciones de respuesta que creamos, por ejemplo, en el caso de obtener los usuarios tendremos el siguiente resultado. (Importante hacerlo en los demás métodos, tomando en cuenta los códigos de status):

```ts
export class UserController {
    ...
    public async getAllUsers(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._userService.findAllUsers()
            
            if (!data.length) return this._httpResponse.NotFound(res, 'No hay resultados')
            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}
```

Para los métodos de actualizar y eliminar un usuario, tipamos la data que se obtiene por respuesta a los métodos del servicio:

```ts
import { UpdateResult, DeleteResult } from 'typeorm';

export class UserController {
    ...
    public async updateUser(req: Request, res: Response): Promise<unknown> {
        try {
            ...
            const data: UpdateResult = await this._userService.updateUser(id, { ...req.body })
            ...
        } catch (error) { ... }
    }

    public async deleteUser(req: Request, res: Response): Promise<unknown> {
        try {
            ...
            const data: DeleteResult = await this._userService.deleteUser(id)
            ...
        } catch (error) { ... }
    }
}
```

| Anterior                                                        |                        | Siguiente |
| --------------------------------------------------------------- | ---------------------- | --------- |
| [Implementación de Servicios](P6T1_Implementacion_Servicios.md) | [Readme](../README.md) | [TypeORM 0.3.6 (Latest Version)](P8T1_TypeOrm_0.3.6.md) |
