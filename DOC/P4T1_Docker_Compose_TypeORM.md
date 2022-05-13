# Docker Compose y TypeORM (Base de Datos)

Necesitamos tener instalados ***Docker*** y ***Docker Compose***, para verificar las versiones usamos los siguientes comandos:

```txt
docker -v
```

```txt
docker-compose -v
```

Teniendo instalado lo anterior, creamos un archivo llamado `docker-compose.yml`. Esta es su explicación paso a paso:

- `version`: Declaramos la versión de compatibilidad con Docker Compose
- `services`: Los servicios de los que hará uso nuestro proyecto:
- `db_node`: Es un servicio cuyo nombre es personalizado, y que contendrá la configuración de la base de datos
- `image`: Imagen que se obtiene de Docker para poder ejecutar nuestra base de datos, en este caso empleamos la imagen de mysql en su versión 5.7
- `volumes`: Generar un volumen en una ruta especifica, en este caso queremos generar una copia del script de inicialización de la base de datos, para luego ejecutarlo desde el volumen. Apuntamos que la ruta del script sql origina se encuentra en `/mysql/init.sql`, y queremos hacer la copia (usando el símbolo `:`) a `/docker-entrypoint-initdb.d/init.sql`
- `command`: Se define el comando que se correrá para el volumen, en este caso queremos correr el script de sql.
- `ports`: Se definen los puertos que quedarán expuestos para el host. Estamos usando el puerto personalizado `3333`, teniendo en cuenta que el puerto por defecto es el `3306`
- `environment`: Declaramos las variables de entorno que deben incluidas en nuestro servicio

Teniendo en cuenta los campos anteriores, tendremos la siguiente estructura (importante respetar la identación):

```yml
version: "3.1"

services:
    db_node:
        image: mysql:5.7
        volumes:
            - ./mysql/init.sql:/docker-entrypoint-initdb.d/init.sql
        command: --init-file=/docker-entrypoint-initdb.d/init.sql
        ports:
            - "3333:3306"
        environment:
            MYSQL_DATABASE: db_node
            MYSQL_ROOT_USER: user_node
            MYSQL_USER: user_node
            MYSQL_ROOT_PASSWORD: "root"
            MYSQL_PASSWORD: "root"
```

Una vez listo el archivo, vamos a la consola y ejecutamos el siguiente comando para ejecutar nuestro servicio, lo cual primero hará un pull de la imagen de mysql:

```txt
docker-compose up
```

Vamos a usar gestor de conexiones de bases de datos, en mi caso estoy empleando ***TablePlus***. Creamos una nueva conexión de MySQL usando los siguientes datos:

| Clave    | Valor                        |
| -------- | ---------------------------- |
| Nombre   | Node_TS_MySQL_TypeORM_Docker |
| Host     | localhost                    |
| Port     | 3333                         |
| User     | user_node                    |
| Password | root                         |
| Database | db_node                      |

Esta claro que aún no tenemos ninguna tabla, pero irán apareciendo a medida que usemos TypeORM. Vamos a ir a nuestro archivo `config.ts` y creamos un método get para obtener la configuración de TypeORM, pero antes configuramos algunas variables de entorno dentro de `.env`:

```.env
DB_HOST = "localhost"
DB_PORT = 3333
DB_DATABASE = "db_node"
DB_USER = "user_node"
DB_PASSWORD = "root"
```

Teniendo las variables de entorno, podemos definir las propiedades dentro de la configuración para TypeORM:

```ts
...
import { DataSourceOptions } from 'typeorm'

export abstract class ConfigServer {
    ...
    protected get configTypeORM(): DataSourceOptions {
        return {
            type: 'mysql',
            host: this.getEnvironment('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            database: this.getEnvironment('DB_DATABASE'),
            username: this.getEnvironment('DB_USER'),
            password: this.getEnvironment('DB_PASSWORD')
        }
    }
}
```

Es importante definir el mapeo de las entidades, por lo que definimos la propiedad para que lea aquellos archivos que tienen el subfijo de `entity`. También definimos las migraciones a cargar para la base de datos, establecemos el sincronismo para poder crear y actualizar el esquema de la base de datos cada que se lanza la aplicación, establecemos que no se muestren las consultas en consola, y por último definimos el tipo de estrategia para nombrar las tablas en la base de datos (en este caso el patrón Snake, es decir que los nombres de las tablas tendrán este aspecto `nombre_tabla`):

```ts
...
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export abstract class ConfigServer {
    ...
    protected get configTypeORM(): DataSourceOptions {
        return {
            ...,
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy()
        }
    }
}
```

Regresamos al archivo `server.ts` y creamos un método para conectarnos con la base de datos:

```ts
...
import { DataSource } from "typeorm"

class ServerBootstrap extends ConfigServer {
    ...
    constructor() {
        super()
        ...
        this._dbConnection()
        ...
    }
    ...
    private _dbConnection = async (): Promise<DataSource> => {
        try {
            console.log(green('\nConexión establecida con la base de datos\n'))
            return await new DataSource(this.configTypeORM).initialize()
        } catch (error) {
            console.log(red('Error al intentar conectar la base de datos'))
            throw new Error('Error al intentar conectar la base de datos')
        }
    }
    ...
}
```

## Entity

Creamos un archivo llamado `base.entity.ts`, en el cual tendremos los campos base para todas las entidades, en este caso el id y los campos para fechas de creación y de actualización. La idea es crear una clase abstracta para poder heredar dichos campos:

```ts
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp"
    })
    createdAt!: Date

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp"
    })
    updatedAt!: Date
}
```

Ahora por ejemplo, dentro de la carpeta `entities` creamos una entidad para los usuarios, la cual extenderá de la clase anterior, y a su vez tendrá nuevos campos que usan decoradores para determinar el nombre de las columnas. Como esta nueva clase se debe reflejar en la base de datos, usamos el decorador `@Entity()` en el que definimos el nombre de la tabla.

```ts
import { Column, Entity } from "typeorm";
import { BaseEntity } from "../config/base.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
    @Column()
    username!: string

    @Column()
    name!: string

    @Column()
    lastname!: string

    @Column({ nullable: true })
    jobPosition?: string

    @Column()
    numberPhone!: number
}
```

Antes de levantar nuestro servidor, estamos seguros de que la base de datos no contiene ningún esquema, pero una vez levantamos el servicio con `docker-compose up`, y ponemos en ejecución nuestro servidor, se crea una tabla correspondiente a la entidad de usuarios.
