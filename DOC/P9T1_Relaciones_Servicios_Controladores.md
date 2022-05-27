# Relaciones con Servicios y Controladores

## Purchase-Product

Haremos algunas correcciones en la entidad `PurchasesProductsEntity`:

- Cambiamos el nombre a `PurchaseProductEntity`, lo cual conlleva a cambiar el nombre del archivo y a que el nombre de la tabla dentro de la base de datos sea en singular.
- Las propiedades de productos y compras ahora serán en singular y no serán un arreglo como se había estado manejando.
- El archivo DTO correspondiente también cambiará su nombre a singular.
- El archivo de Service correspondiente también cambiara su nombre a singular, igualmente los métodos de encontrar por id, crear, actualizar y eliminar. Estas mismas modificaciones se efectúan para el archivo del Controller.

Para aplicar los cambios tenemos que bajar el servidor, eliminar la carpeta `dist` y generar una nueva migración:

```txt
npm run m:gen -- src/migrations/UpdatePurchaseProduct
```

Corremos la migración para subir los cambios a la base de datos:

```txt
npm run m:run
```

Necesitamos tratar el precio de la relación purchase-product, no podemos enviar el precio de manera quemada. Tenemos que mantener la operación del valor del producto vs la cantidad de los mismos. La manera en que lo vamos a hacer, es inyectar el servicio de los productos dentro del servicio de `purchases-products.service.ts`:

```ts
export class PurchasesProductsService extends BaseService<PurchasesProductsEntity> {
    constructor(private readonly _productService: ProductService = new ProductService()) {
        ...
    }
    ...
}
```

Ahora, dentro del método para crear una nueva entidad de purchases-product, creamos una constante que contendrá en memoria el valor base que se está ingresando dentro del método, para ello usamos el método `create()`. Luego, usamos la inyección del servicio de productos para poder buscar un elemento por el id que se está ingresando en el body. Cuando tenemos el producto, configuramos que el precio total del elemento a insertar en la base de datos, sea el resultado del precio del producto multiplicado por la cantidad del mismo. Por último guardamos el nuevo objeto con el precio modificado:

```ts
export class PurchaseProductService extends BaseService<PurchasesProductsEntity> {
    ...
    public async createPurchaseProduct(body: PurchaseProductDTO): Promise<PurchasesProductsEntity> {
        const newPurchaseProduct = (await this.execRepository).create(body)
        const product = await this._productService.findProductById(newPurchaseProduct.product.id)
        newPurchaseProduct.totalPrice = product!.price * newPurchaseProduct.quantityProduct
        return (await this.execRepository).save(newPurchaseProduct)
    }
    ...
}
```

## Relación entre User y Customer

Vamos a relacionar el usuario con un customer creado, para lo cual creamos un nuevo método dentro de `user.service.ts`. En dicha función vamos crear una consulta que tendrá por alias `user`, luego aplicamos un left join desde la propiedad customer de user hacia la tabla de customer, en donde los elementos coincidan con el id que se ha ingresado en el método, y por último solicitamos que traiga solo un registro:

```ts
export class UserService extends BaseService<UserEntity> {
    ...
    public async findUserWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.customer', 'customer')
            .where({ id })
            .getOne()
    }
}
```

Luego creamos un método dentro del controlador de los usuarios para poder usar el servicio que acabamos de crear:

```ts
export class UserController {
    ...
    public async getUserWithRelation(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params
            const data = await this._userService.findUserWithRelation(id)

            if (!data) return this._httpResponse.BadRequest(res, `No hay ningún elemento con el id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}
```

Por último creamos una ruta para poder usar el controlador:

```ts
export class UserRouter extends BaseRouter<UserController> {
    ...
    protected routes(): void {
        ...
        this.router.get('/users/relation/:id', (req: Request, res: Response) => this.controller.getUserWithRelation(req, res))
    }
}
```

| Anterior                                                        |                        | Siguiente |
| --------------------------------------------------------------- | ---------------------- | --------- |
| [Configurando Migraciones con TypeORM 0.3.6](P8T2_TypeOrm_0.3.6.md) | [Readme](../README.md) | [Middleware de Validación de Datos](P10T1_Middleware_Validacion_Datos.md) |
