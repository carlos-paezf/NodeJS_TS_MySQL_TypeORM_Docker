# TypeORM 0.3.6 (Latest Version)

Dentro del curso se estaba usando la versión `^0.2.45` de TypeORM, lo que queremos hacer es migrar a la versión `0.3.6`, razón por la cual eliminamos el directorio `node_modules`, y posteriormente dentro del archivo `package.json` modificamos la versión de la dependencia:

```json
{
    "dependencies": {
        ...,
        "typeorm": "^0.3.6",
    },
}
```

Para instalar de nuevo todas las dependencias, usamos el comando `npm install` y con ello traemos todas las versiones definidas.

## Separar la declaración de conexión

Dentro del directorio `config` creamos un nuevo archivo llamado `data.source.ts`, con el fin de tener las variables de configuración dentro de un solo archivo. Lo primero será configurar el path de las variables de entorno:

```ts
import * as dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV !== undefined ? `.${process.env.NODE_ENV.trim()}.env` : '.env'
})
```

Posteriormente creamos un objeto con las variables de entorno que se requieren para la conexión con la base de datos:

```ts
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const Config: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
    synchronize: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy()
}
```

Lo que se exportara dentro del archivo será una instancia de `DataSource` con el objeto de configuración:

```ts
import { DataSource } from "typeorm";

export const AppDataSource: DataSource = new DataSource(Config)
```

De paso, vamos a configurar las variables para poder usar las migraciones, para ellos desactivamos la sincronización y añadimos la propiedad que permite correr las migraciones una vez se pone en ejecución el servidor:

```ts
const Config: DataSourceOptions = {
    ...,
    synchronize: false,
    migrationsRun: true,
    ...
}
```

Volvemos al archivo `config.ts` y eliminamos el método `configTypeORM()` y convertimos en un getter el método `dbConnection()`, que ahora se verá de la siguiente manera:

```ts
import { DataSource } from 'typeorm'
import { AppDataSource } from './data.config';

export abstract class ConfigServer {
    ...
    protected get dbConnection(): Promise<DataSource> {
        return AppDataSource.initialize()
    }
}
```

En el archivo `server.ts` vamos a crear un nuevo método que se encargara de hacer la conexión con la base de datos:

```ts
class ServerBootstrap extends ConfigServer {
    ...
    constructor() {
        ...
        this._dbConnect()
        ...
    }
    ...
    private async _dbConnect(): Promise<DataSource | void> {
        return this.dbConnection
            .then(() => console.log(blue('> Conexión establecida con la base de datos')))
            .catch((error) => console.log(red('> Error intentando conectar la base de datos: '), error))
    }
    ...
}
```

| Anterior                                                        |                        | Siguiente |
| --------------------------------------------------------------- | ---------------------- | --------- |
| [Manejo de Errores y Respuestas](P7T1_Manejo_Errores_Respuestas.md) | [Readme](../README.md) | [Configurando Migraciones con TypeORM 0.3.6](P8T2_TypeOrm_0.3.6.md) |
