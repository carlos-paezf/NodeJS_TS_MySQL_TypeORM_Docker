# Servicio de Autenticación - Parte 2

Vamos a crear un servicio dedicado a la autenticación. Lo primero será instalar el paquete y el tipado de JWT con los siguientes comandos:

```txt
npm i jsonwebtoken
```

```txt
npm i -D @types/jsonwebtoken
```

Dentro de nuestro servicio, tenemos dos inyecciones: una instancia del servicio de usuarios y una instancia de todo el paquete de JWT:

```ts
import * as jwt from 'jsonwebtoken'
import { ConfigServer } from "../../config/config"
import { UserService } from "../../user/services/user.service"

export class AuthService extends ConfigServer {
    constructor(
        private readonly _userService: UserService = new UserService(),
        private readonly _jwtInstance = jwt
    ) { super() }
}
```

La primera función será la validación del usuario, ya sea por username o por email, para luego verificar que la contraseña que haya ingresado haga match con la que se encuentra en la base de datos.

```ts
...
import { compare } from 'bcrypt'

export class AuthService extends ConfigServer {
    ...
    public async validateUser(emailOrUsername: string, password: string): Promise<UserEntity | null> {
        const userByEmail = await this._userService.findUserByEmail(emailOrUsername)
        const userByUsername = await this._userService.findUserByUsername(emailOrUsername)

        if (userByUsername) {
            const isMatch = await compare(password, userByUsername.password)
            isMatch && userByUsername
        }
        if (userByEmail) {
            const isMatch = await compare(password, userByEmail.password)
            isMatch && userByEmail
        }

        return null
    }
}
```

Luego, creamos una función que se encargará de firmar el jwt con el payload, la llave secreta y todas las opciones adicionales que necesitemos, como por ejemplo el tiempo de expiración:

```ts
export class AuthService extends ConfigServer {
    ...
    public sign(payload: jwt.JwtPayload, secret: any) {
        return this._jwtInstance.sign(payload, secret)
    }
}
```

Ahora bien, dentro de los servicios del usuario, creamos un método para encontrar el usuario con el rol que se necesita:

```ts
export class UserService extends BaseService<UserEntity> {
    ...
    public async findUserWithRole(id: string, role: RoleType): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id, role })
    }
}
```

Volvemos a nuestro servició de autenticación, y creamos un método para la creación del JWT, basado en la información de un usuario:

```ts
export class AuthService extends ConfigServer {
    ...
    public async generateJWT(user: UserEntity): Promise<{accessToken: string, user: UserEntity}> {
        const userQuery = await this._userService.findUserWithRole(user.id, user.role)

        const payload: PayloadToken = {
            role: userQuery!.role,
            sub: userQuery!.id
        }

        if (userQuery) {
            user.password = 'Not Permission'
        }

        return {
            accessToken: this.sign(payload, this.getEnvironment('JWT_SECRET_KEY')),
            user
        }
    }
}
```

| Anterior                                                                                |                        | Siguiente |
| --------------------------------------------------------------------------------------- | ---------------------- | --------- |
| [Password Hashing y Query Builders - Parte 1](P11T1_Password_Hashing_Query_Builders.md) | [Readme](../README.md) | [Passport Local y JWT - Parte 3](P11T3_Passport_Local_JWT.md) |
