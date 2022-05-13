# Arquitectura Relaciones de Entidades - Parte 2

## Relaciones entre entidades

Vamos a crear las entidades basadas en los diagramas de la sección anterior.

### User - Customer = 1:1

La primera relación será entra la entidad de `UserEntity` y la de `CustomerEntity`, en la cual se presenta una relación `1:1`. Para este tipo de relación debemos usar en las 2 entidades, un decorador de TypeORM llamado `@OneToOne()`, en el cual cargamos la entidad a la que apunta, y luego cargamos la propiedad a referenciar. Teniendo en cuenta lo anterior, nuestra entidad de usuarios quedaría de la siguiente manera:

```ts
import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from '../../customer/entities/customer.entity';

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
    @Column()
    name!: string

    @Column()
    lastname!: string

    @Column()
    username!: string

    @Column()
    email!: string

    @Column()
    password!: number

    @Column()
    city!: string
    
    @Column()
    providence!: string

    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity
}
```

Y nuestra clase `CustomerEntity` queda configurada de la siguiente manera:

```ts
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'customer' })
export class CustomerEntity extends BaseEntity {
    @Column()
    address!: string

    @Column()
    dni!: string

    @OneToOne(() => UserEntity, (user) => user.customer)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity
}
```

### Customer - Purchase = 1:n

Nos encontramos con la relación `CustomerEntity` con `PurchaseEntity`, la cual es una relación uno a muchos (`1:n`). Nuestra clase `PurchaseEntity` lucirá de la siguiente manera:

```ts
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from '../../customer/entities/customer.entity';

@Entity({ name: 'purchase' })
export class PurchaseEntity extends BaseEntity {
    @Column()
    status!: string

    @Column()
    paymentMethod!: string

    @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
    @JoinColumn({ name: 'customer_id' })
    customer!: CustomerEntity
}
```

Y nuestra entidad de `CustomerEntity`, tendrá estos nuevos campos:

```ts
import { ..., OneToMany } from "typeorm";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";

@Entity({ name: 'customer' })
export class CustomerEntity extends BaseEntity {
    ...

    @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
    purchases!: PurchaseEntity[]
}
```

### Category - Product = 1:n

Tenemos otra relación uno a muchos, esta vez con las clases `CategoryEntity` y `ProductEntity`:

```ts
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/product.entity";

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
    @Column()
    categoryName!: string
    
    @OneToMany(() => ProductEntity, (product) => product.category)
    products!: ProductEntity[]
}
```

```ts
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CategoryEntity } from "../../category/entities/category.entity";
import { BaseEntity } from "../../config/base.entity"

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
    @Column()
    productName!: string

    @Column()
    description!: string

    @Column()
    price!: number

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category!: CategoryEntity
}
```

### Purchase - Products = n:n

En esta ocasión presentamos una relación muchos a muchos (`n:n`), por lo que aplicamos la estrategia de tener una entidad de rompimiento llamada `PurchasesProductsEntity` dentro de la carpeta `custom`. En esta clase referenciamos las llaves primarias de las tablas de productos y compras:

```ts
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from '../../product/entities/product.entity';
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";

@Entity({ name: 'purchases_products' })
export class PurchasesProductsEntity extends BaseEntity {
    @Column()
    quantityProduct!: number

    @Column()
    totalPrice!: number

    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct)
    @JoinColumn({ name: 'purchase_id' })
    purchases!: PurchaseEntity[]

    @ManyToOne(() => ProductEntity, (product) => product.purchaseProduct)
    @JoinColumn({ name: 'product_id' })
    products!: ProductEntity[]
}
```

Luego, las 2 entidades involucradas tendrán el siguiente campo:

```ts
import { ..., OneToMany } from "typeorm";
import { PurchasesProductsEntity } from "../../custom/entities/purchases-products.entity";

@Entity({ name: 'purchase' })
export class PurchaseEntity extends BaseEntity {
    ...
    @OneToMany(() => PurchasesProductsEntity, (purchaseProduct) => purchaseProduct.purchases)
    purchaseProduct!: PurchasesProductsEntity
}
```

```ts
import { ..., OneToMany } from "typeorm";
import { PurchasesProductsEntity } from '../../custom/entities/purchases-products.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
    ...
    @OneToMany(() => PurchasesProductsEntity, (purchaseProduct) => purchaseProduct.products)
    purchaseProduct!: PurchasesProductsEntity
}
```

| Anterior                                                                   |                        | Siguiente |
| -------------------------------------------------------------------------- | ---------------------- | --------- |
| [Arquitectura y Relaciones de Entidades - Parte 1](P5T1_Arquitectura_Relaciones_Entidades.md) | [Readme](../README.md) | [Implementación de Servicios](P6T1_Implementacion_Servicios.md)  |
