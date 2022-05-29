# Password Hashing y Query Builders - Parte 1

## Hacer invisible el campo de la contraseña en los Select

Lo primero que haremos será hacer invisible la contraseña dentro las consultas de get, para ello hacemos lo siguiente:

```ts
@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
    ...
    @Exclude()
    @Column({ select: false })
    password!: string
    ...
}
```

Lo anterior presenta una complicación: Al estar oculto en todas las consultas de Select, no podremos traer el valor de la contraseña para hacer una comprobación de la misma. Por esta razón, más adelante haremos un tipo de query builder.

## Cifrar la contraseña

Necesitamos instalar el paquete `bcrypt`, por lo que usamos los siguientes comandos para instalar el paquete y sus tipos:

```txt
npm i bcrypt
```

```txt
npm i -D @types/bcrypt
```

Teniendo instalado el paquete y sus tipos, vamos al `UserService`, y en el método de guardar tomamos el elemento que se ingresando, lo guardamos en memoria, luego encriptamos la contraseña y se la asignamos al objeto que será enviado a la base de datos:

```ts
...
import { hash } from "bcrypt";

export class UserService extends BaseService<UserEntity> {
    ...
    public async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = (await this.execRepository).create(body)
        const passwordHash = await hash(newUser.password, 10)
        newUser.password = passwordHash
        return (await this.execRepository).save(newUser)
    }
    ...
}
```

## Encontrar un usuario por su correo o username

Creamos un query builder en el que traemos la contraseña del usuario en donde coincida con el email o con el nombre de usuario. Esto lo hacemos por qué la contraseña esta oculta en los selects, y nosotros necesitamos validar que la contraseña ingresada por el usuario coincida con su email o username:

```ts
export class UserService extends BaseService<UserEntity> {
    ...
    public async findUserByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where({ email })
            .getOne()
    }

    public async findUserByUsername(username: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where({ username })
            .getOne()
    }
}
```

| Anterior                                                        |                        | Siguiente |
| --------------------------------------------------------------- | ---------------------- | --------- |
| [Middleware de Validación de Datos](P10T1_Middleware_Validacion_Datos.md) | [Readme](../README.md) | [Servicio de Autenticación](P11T2_Servicio_Autenticacion.md) |
