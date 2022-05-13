# Creando una aplicación de servidor - Parte 2

## Creación de una ruta

Vamos a crear una ruta para nuestra api, por el momento lo haremos directamente dentro del constructor, pero luego lo haremos escalable.

```ts
class ServerBootstrap {
    constructor() {
        ...

        this._app.get('/api/hola-mundo', (req: express.Request, res: express.Response) => {
            res.status(200).json({
                ok: true,
                msg: 'Hola mundo'
            })
        })
        this.listen()
    }
    ...
}
```

## API Client

Podemos usar un API Client para probar nuestro servicio, para este proyecto usaré ***Thunder Client***, y también creare un directorio llamado `REST` en donde guardaré los endpoints. Es importante que tengamos el servidor corriendo para hacer la petición.

## Script para modo desarrollo

Volvemos al archivo `package.json` y añadimos un nuevo script para actualizar los cambios en el servidor mientras lo tenemos corriendo:

```json
{
    ...,
    "scripts": {
        ...,
        "start:dev": "tsc && concurrently \"tsc -w\" \"nodemon dist/server.js\""
    },
}
```

Ahora podemos ejecutar el siguiente comando para el modo desarrollo:

```txt
npm run start:dev
```

| Anterior                                                                   |                        | Siguiente |
| -------------------------------------------------------------------------- | ---------------------- | --------- |
| [Creando una aplicación de servidor - Parte 1](P1T1_Creando_Aplicacion_Servidor.md) | [Readme](../README.md) | [Router de nuestra aplicación](P2T1_Router_Aplicacion.md) |
