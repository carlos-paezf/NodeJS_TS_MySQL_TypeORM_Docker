# Configurando Migraciones con TypeORM 0.3.6

## Instalar paquetes necesarios

Necesitamos instalar el paquete `reflect-metadata` con el fin de añadir metadata al ECMAScript, y para ello usamos el siguiente comando:

```txt
npm i reflect-metadata
```

Teniendo el paquete instalado, dentro del archivo `server.ts` lo importamos:

```ts
import 'reflect-metadata'
```

También necesitamos instalar la dependencia `ts-node` en modo desarrollo, para lo cual empleamos el siguiente comando:

```txt
npm i -D ts-node
```

## Scripts

Vamos a crear un nuevo script que hará uso de typeorm y ts-node para ejecutar TS sobre Node.js sin necesidad de hacer una precompliación, y lo apuntamos al archivo donde tenemos las variables de conexión y configuración de la base de datos y typeorm.

```json
{
    ...,
    "scripts": {
        ...,
        "typeorm": "typeorm-ts-node-esm -d ./src/config/data.config.ts"
    },
    ...
}
```

Luego creamos otro comando que va a usar el anterior, con el fin de generar las migraciones y otro para correrlas:

```json
{
    ...,
    "scripts": {
        ...,
        "m:gen": "npm run typeorm migration:generate",
        "m:run": "npm run typeorm migration:run"
    },
}
```

## Probar las migraciones

Para comprobar que todo este funcionando, vamos a añadir una nueva columna a la entidad del usuario, la cual será un enum para los roles. El enum se encuentra dentro del archivo `user.dto.ts`:

```ts
import { RoleType } from "../dto/user.dto";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
    ...
    @Column({ type: 'enum', enum: RoleType, nullable: false })
    role!: RoleType
    ...
}
```

```ts
export enum RoleType {
    USER = 'USER',
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN'
}
```

Para correr nuestras migraciones, vamos a usar los scripts que creamos. Primero generamos las migraciones dentro de la carpeta `migrations`:

```txt
npm run m:gen -- src/migrations/ChangeUser
```

Una vez generado el archivo con la migración, lo corremos:

```txt
npm run m:run
```

Las migraciones son un conjunto de sentencias que permiten hacer cambios desde el backend hacia la base de datos, es por ello que dentro del archivo de la migración, o al momento de correr la migración, se observan las sentencias SQL para actualizar la DB. Esta es la manera más segura de llevar un servicio a producción, mientras que syncronized es más rápido durante el desarrollo.

| Anterior                                                        |                        | Siguiente |
| --------------------------------------------------------------- | ---------------------- | --------- |
| [TypeORM 0.3.6 (Latest Version)](P8T1_TypeOrm_0.3.6.md) | [Readme](../README.md) | [Relaciones con Servicios y Controladores](P9T1_Relaciones_Servicios_Controladores.md) |
