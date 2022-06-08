# Passport Local y JWT - Parte 3

Para esta sección necesitamos instalar los paquetes `passport`, `passport-local` y `passport-jwt`, para lo cual usamos los siguientes comandos:

```txt
npm i passport passport-local passport-jwt
```

```txt
npm i -D @types/passport @types/passport-local @types/passport-jwt
```

## Establece el uso de un Passport

Creamos un archivo dentro de `auth/utils/`, el cuál será llamado `passport.use.ts`. Dentro de este archivo vamos a definir un tipo llamado `TypeStrategy`, que contiene 3 tipos genéricos, los cuales se usan dentro del constructor de una clase anónima para los parámetros `params` de tipo `U` y `callback` de tipo `X`, que terminan retornando un elemento de tipo `T`.

Luego, creamos una función que define el uso del passport, en donde tenemos 3 tipos genéricos: `T` es una clase que extiende de la interfaz `Strategy` del paquete `passport`, luego tenemos un tipo `U` el cual es un objeto que servirá como las opciones de estrategia en caso de ser necesario, y por último tenemos el tipo `X` que actúa de función de verificación. Nuestra función `PassportUse` va a recibir por parámetros un nombre, el tipo de estrategia, los parámetros de opciones de la estrategia, y una función de validación. Posteriormente establecemos el uso del passport con su nombre, y una instancia de la clase estrategia con los parámetros y función callback.  

```ts
import passport, { Strategy } from "passport"

type TypeStrategy<T, U, X> = { new (params: U, callback: X): T }

export function PassportUse<T extends Strategy, U, X>(name: string, Strategy: TypeStrategy<T, U, X>, params: U, callback: X) {
    passport.use(name, new Strategy(params, callback))
}
```

## Passport Local para el Login

Creamos una clase dentro del archivo `auth/strategies/login.strategy.ts`, en la cual establecemos una función para validar que el usuario si haya sido encontrado, ya sea por su username o por su correo. En caso de que no exista, se envía una función con un mensaje de invalidez, pero si el usuario existe, entonces se retorna la misma función pero con la data del mismo.

También tenemos otra función en la que implementamos nuestra función `PassportUse`, en la cual le entregamos por tipos la clase `Strategy` de `passport-local` pero con el alias de `LocalStrategy`, un Objeto vacío, y la interfaz `VerifyFunction` de `passport-local`. Los parámetros serán el nombre del passport, la estrategia, un objeto con los campos de username y password, y la función de validación creada en la misma clase.

```ts
import { UserEntity } from "../../user/entities/user.entity"
import { AuthService } from "../services/auth.service"
import { PassportUse } from "../utils/passport.use"
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local"


const authService: AuthService = new AuthService()


export class LoginStrategy {
    async validate(username: string, password: string, done: any): Promise<UserEntity> {
        const user = await authService.validateUser(username, password)

        if (!user) return done(null, false, { message: 'Invalid username or password' })

        return done(null, user)
    }

    get use() {
        return PassportUse<LocalStrategy, Object, VerifyFunction>(
            'login',
            LocalStrategy,
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            this.validate
        )
    }
}
```

## Passport JWT

Tenemos el archivo `jwt.strategy.ts`, en el cuál creamos una clase que extiende de nuestro servicio `AuthService`. Volvemos a crear una clase de validación, pero en este caso no requerimos validar ningún usuario, solo queremos enviar el payload que se pase por parámetro.

Mediante el método getter usamos nuestra función `PassportUse`, teniendo como tipos la clase `Strategy` de `passport-jwt` con el alias de `JwtStrategy`, la interfaz `StrategyOptions` también de `passport-jwt` y una función anónima que retornará dentro de una promesa el objeto del token con el payload. Los argumentos de la función serán el nombre `jwt`, la clase `JwtStrategy`, un objeto con los opciones para la la clase de estrategia, y el método de validación de nuestra clase.

```ts
import { PayloadToken } from "../interfaces/auth.interface"
import { AuthService } from "../services/auth.service"
import { PassportUse } from '../utils/passport.use'
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt'


export class JWTStrategy extends AuthService {
    constructor() {
        super()
    }

    async validate(payload: PayloadToken, done: any) {
        return done(null, payload)
    }

    get use() {
        return PassportUse<JwtStrategy, StrategyOptions, (payload: PayloadToken, done: any) => Promise<PayloadToken>>(
            'jwt',
            JwtStrategy,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.getEnvironment('JWT_SECRET_KEY')
            },
            this.validate
        )
    }
}
```

## Llamado de las clases

Dentro de nuestra clase `ServerBootstrap` creamos una función para retornar un arreglo con instancias de nuestras estrategias, las cuales establecen el uso del passport. Dicha función se llamará en el constructor de clase.

```ts
class ServerBootstrap extends ConfigServer {
    ...
    constructor() {
        ...
        this._passportUse()
        ...
    }
    ...
    private _passportUse() {
        return [
            new LoginStrategy().use,
            new JWTStrategy().use
        ]
    }
    ...
}
```

| Anterior                                                     |                        | Siguiente |
| ------------------------------------------------------------ | ---------------------- | --------- |
| [Servicio de Autenticación](P11T2_Servicio_Autenticacion.md) | [Readme](../README.md) | [Creación y Autenticación de Usuarios](P11T4_Creacion_Autenticacion_Usuarios.md) |
