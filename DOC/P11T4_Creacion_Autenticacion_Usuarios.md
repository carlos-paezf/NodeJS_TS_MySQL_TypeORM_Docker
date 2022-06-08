# Creación y Autenticación de Usuarios - Parte 4

Dentro del directorio `auth`, creamos una nueva carpeta para los controladores, con un archivo incluido llamado `auth/controllers/auth.controller.ts`, y además un archivo llamado `auth/auth.router.ts`. Luego dentro de `shared`, añadimos un directorio para los middlewares compartido con un archivo llamado `shared/middlewares/shared.middleware.ts`.

Lo primero será configurar el controlador para la autenticación. Tenemos una clase para controlar el ingreso de los usuario, es decir el método `login`. Para esta función, tomamos la información del usuario que hace la petición y hacemos que sea de tipo `UserEntity`, dichos datos los usamos para generar el JWT. Si lo que se retorna de `encode` es un null, entonces se envía el mensaje de que el usuario no está autorizado.

Con los datos que se obtienen se escribe un header y una cookie dentro de la respuesta:

```ts
export class AuthController extends AuthService {
    constructor(private readonly _httpResponse: HttpResponse = new HttpResponse()) {
        super()
    }

    login = async (req: Request, res: Response) => {
        try {
            const userEncode = req.user as UserEntity
            const encode = await this.generateJWT(userEncode)

            if (!encode) {
                return this._httpResponse.Unauthorized(res, 'No tienes permisos')
            }

            res.header('Content-Type', 'application/json')
            res.cookie('accessToken', encode.accessToken, { maxAge: 6000 * 60 })
            res.write(JSON.stringify(encode))
            res.end()
        } catch (error) {
            console.log(red('Error in AuthController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}
```

Procedemos a escribir los middlewares que se van a compartir a través de la aplicación. Usamos el paquete `passport` para establecer el tipo de estrategia de autenticación en las rutas en las que se requiere la autenticación. También tenemos un método para verificar que el rol del usuario sea el de Administrador. Este último middleware es importante en los casos que queremos tener una máxima protección de los datos o secciones de la API:

```ts
import passport from 'passport'
...

export class SharedMiddleware {
    constructor(public readonly httpResponse: HttpResponse = new HttpResponse()) { }

    passAuth(type: string) {
        return passport.authenticate(type, { session: false })
    }

    checkAdminRole(req: Request, res: Response, next: NextFunction) {
        const user = req.user  as UserEntity
        if (user.role !== RoleType.ADMIN) {
            return this.httpResponse.Unauthorized(res, 'No tienes permiso')
        }
        return next()
    }
}
```

Un cambio que haremos, será hacer que la clase `UserMiddleware` herede de `SharedMiddleware`, esto con el fin de poder acceder a los métodos anteriores.

```ts
export class UserMiddleware extends SharedMiddleware {
    constructor() { 
        super()
    }
    ...
}
```

Creamos la ruta para el ingreso de sesión, en cuyo endpoint usamos el middleware para definir el tipo de autenticación de pasaporte, en este caso es la estrategia local, es decir el tipo `login`:

```ts
export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
    constructor() {
        super(AuthController, SharedMiddleware)
    }

    protected routes(): void {
        this.router.post('/login', this.middleware.passAuth("login"), this.controller.login)
    }
}   
```

Un nuevo cambio es que para el endpoint de eliminación de usuarios, pasamos el middleware para definir que la estrategia de autenticación es JWT, y también usamos la validación de que se debe tener el rol de Admin:

```ts
export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    ...
    protected routes(): void {
        ...
        this.router.delete(
            '/delete-user/:id', 
            [this.middleware.passAuth('jwt'), this.middleware.checkAdminRole], 
            this.controller.deleteUser
        )
        ...
    }
}
```

Lo último es registrar los endpoints de la autenticación dentro del servidor:

```ts
class ServerBootstrap extends ConfigServer {
    ...
    private _routers = (): express.Router[] => {
        return [
            new AuthRouter().router,
            ...
        ]
    }
}
```

| Anterior                                                      |                        | Siguiente |
| ------------------------------------------------------------- | ---------------------- | --------- |
| [Passport Local y JWT - Parte 3](P11T3_Passport_Local_JWT.md) | [Readme](../README.md) |           |
