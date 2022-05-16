# Implementación de Servicios

Lo primero será aplicar un cambio en el método de conexión a la base de datos. Actualmente se encuentra dentro de la clase `ServerBootstrap`, pero la idea es que lo traslademos a la clase `ConfigServer`:

```ts
import { DataSource } from 'typeorm'

export abstract class ConfigServer {
    ...
    protected async dbConnection(): Promise<DataSource> {
        try {
            console.log(green('\nConexión establecida con la base de datos\n'))
            return await new DataSource(this.configTypeORM).initialize()
        } catch (error) {
            console.log(red('Error al intentar conectar la base de datos'))
            throw new Error('Error al intentar conectar la base de datos')
        }
    }
}
```

## BaseService

Ahora, procedemos a crear un servicio dentro de la carpeta `config`, con el fin de poder hacer la instancia de la conexión. Esta clase será de un tipo genérico que extiende de nuestra clase `BaseEntity`, mientras que a su vez, la clase `BaseService` va a heredar de `ConfigServer`. En esta clase tenemos una propiedad que va a almacenar el valor de la inicialización del repositorio asignado a una entidad dentro de la base de datos.

```ts
import { Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRepository: Promise<Repository<T>>

    constructor() {
        super()
    }
}
```

La función encargada de inicializar el repositorio, obtiene la conexión de la base de datos y posteriormente retorna un repositorio en base a la entidad entregada por parámetro. Esta función se usa para asignarle el valor a la propiedad creada con anterioridad, basada en la entidad objetivo que se ingresa al crear una instancia de la clase.

```ts
import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRepository: Promise<Repository<T>>

    constructor(private _getEntity: EntityTarget<T>) {
        super()
        this.execRepository = this.initRepository(_getEntity)
    }

    public async initRepository<T>(entity: EntityTarget<T>): Promise<Repository<T>> {
        const getConnection = await this.dbConnection()
        return getConnection.getRepository(entity)
    }
}
```

## BaseDTO y UserDTO

El patrón `DTO` es la sigla de ***Data Transfer Object*** y sirve para la creación de objetos planos (POJO) con una serie de atributos que pueden ser enviados y recuperados del servidor en una sola invocación, de tal manera que un DTO puede contener información de múltiples fuentes o tablas y concentrarlas en una única clase simple. Creamos dentro de `config` una clase llamada `BaseDTO`, que tendrá la finalidad de validar los campos en común de todas las entidades, mediante los decoradores de `class-validator`.

```ts
import { IsDate, IsOptional, IsUUID } from "class-validator";

export class BaseDTO {
    @IsUUID()
    @IsOptional()
    id!: string

    @IsDate()
    @IsOptional()
    createdAt!: Date

    @IsDate()
    @IsOptional()
    updatedAt!: Date
}
```

Ahora bien, dentro de cada directorio de las entidades, creamos una nueva carpeta para los DTO, pero aún no funcionarán puesto que no tenemos middlewares todavía. Los campos de esta clase no pueden estar vacíos, esa es la razón de uso del decorador `@IsNotEmpty()`:

```ts
import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO {
    @IsNotEmpty()
    name!: string

    @IsNotEmpty()
    lastname!: string

    @IsNotEmpty()
    username!: string

    @IsNotEmpty()
    email!: string

    @IsNotEmpty()
    password!: number

    @IsNotEmpty()
    city!: string
    
    @IsNotEmpty()
    providence!: string
}
```

Aprovechamos y también hacemos un pequeño cambio al campo de la contraseña dentro de la clase `UserEntity`. La idea es que el valor de este campo no sea retornado en las consultas:

```ts
import { Exclude } from "class-transformer";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
    ...
    @Exclude()
    @Column()
    password!: number
    ...
}
```

## UserService

Creamos una carpeta llamada `src/user/services`, y dentro de la misma un archivo llamado `user.service.ts` para contener la clase `UserService`, la cual extiende de `BaseService`. Como recordamos, al hacer la instanciación de la clase padre, necesitamos entregarle la entidad a la cual vamos a acceder, por lo tanto hacemos el tipado y la entrada del argumento de la clase `UserEntity`:

```ts
import { BaseService } from "../../config/base.service";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity)
    }
}
```

Dentro de este servicio vamos a tener una serie de métodos para manipular la entidad del Usuario, tales como encontrar todos, encontrar por Id, crear un usuario, editar o eliminar:

```ts
import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";


export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity)
    }

    public async findAllUsers(): Promise<UserEntity[]> {
        return (await this.execRepository).find()
    }

    public async findUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async createUser(body: UserDTO): Promise<UserEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
}
```

## UserController

Dentro de la clase `UserController`, vamos inyectar una instancia de solo lectura de `UserService` con el fin de poder acceder a sus métodos:

```ts
import { UserService } from "../services/user.service";

export class UserController {
    constructor(private readonly _userService: UserService = new UserService()) { }
    ...
}
```

Procedemos a crear los métodos para el CRUD de nuestra entidad:

```ts
import { Request, Response } from "express";
import { red } from 'colors';
import { UserService } from "../services/user.service";


export class UserController {
    constructor(private readonly _userService: UserService = new UserService()) { }

    public async getAllUsers(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._userService.findAllUsers()
            return res.status(200).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async getUserById(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params
            const data = await this._userService.findUserById(id)

            return res.status(200).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async createUser(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._userService.createUser({ ...req.body })
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async updateUser(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params
            const data = await this._userService.updateUser(id, { ...req.body })

            return res.status(201).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params
            const data = await this._userService.deleteUser(id)

            return res.status(200).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }
}
```

Luego, dentro de la clase `UserRouter`, en el método para configurar las rutas hacemos los cambios para aplicar los controladores en los respectivos endpoints:

```ts
export class UserRouter extends BaseRouter<UserController> {
    ...
    protected routes(): void {
        this.router.get('/users', (req: Request, res: Response) => this.controller.getAllUsers(req, res))
        this.router.get('/user/:id', (req: Request, res: Response) => this.controller.getUserById(req, res))
        this.router.post('/create-user', (req: Request, res: Response) => this.controller.createUser(req, res))
        this.router.put('/update-user/:id', (req: Request, res: Response) => this.controller.updateUser(req, res))
        this.router.delete('/delete-user/:id', (req: Request, res: Response) => this.controller.deleteUser(req, res))
    }
}
```

Dentro de la carpeta `REST`, tenemos un archivo llamado `users.rest`, en donde están los ejemplos de los endpoints.
