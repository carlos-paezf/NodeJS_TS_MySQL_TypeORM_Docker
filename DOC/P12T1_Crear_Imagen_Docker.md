# Crear Imagen de Docker para NodeJS y TypeScript

Vamos a crear una imagen de Docker de nuestro proyecto, para luego poderlos desplegar en una maquina virtual o local, como por ejemplo una instancia EC2 de Amazon, o un servidor local.

Lo primero será crear 2 archivos `.dockerignore` y `Dockerfile`, lo podemos hacer desde una consola de base linux (como Git Bash) con el siguiente comando:

```txt
touch .dockerignore Dockerfile
```

Dentro de `.dockerignore` vamos a añadir lo siguiente, para ignorarlo al momento de construir la imagen:

```.dockerignore
node_modules
dist
src/migrations/*
```

Luego, dentro de `Dockerfile` añadimos lo siguiente:

```dockerfile
# Nombre de la imagen oficial
FROM node:16-alpine

# Instalación de ts-node de manera global
RUN npm install -g ts-node

# Directorio de trabajo
WORKDIR /usr/src/app

# Copia del gestor de paquetes
COPY package*.json ./

# Copia del código fuente
COPY . .

# Instalación de todos los paquetes
RUN npm install

# Entorno de ejecución
ENV NODE_ENV=production

# Generación de migraciones
RUN npm run m:gen -- src/migrations/InitDB

# Correr las migraciones
RUN npm run m:run

# Exponer el container a la red mediante un puerto
EXPOSE 8000

# Determina los scripts para la imagen que se ejecutan cuando se ejecutar el archivo Dockerfile
CMD ["npm", "start"]
```

Dentro de los archivo `.env` y `.production.env`, vamos a añadir nuestra dirección IPv4 para el host de la base de datos, puesto que vamos a correr la imagen en local. Para saber nuestra configuración de red, usamos el comando `ipconfig`:

```env
DB_HOST = "192.xxx.x.xxx"
```

Primero ponemos en ejecución nuestra base de datos con el comando:

```txt
docker-compose up -d
```

Para construir la imagen de nuestro proyecto, usamos el siguiente comando:

```txt
docker build --no-cache --progress=plain -t api-node-ts .
```

Ahora podemos levantar un container en docker, usando nuestra imagen:

```txt
docker run -it -p 8000:8000 api-node-ts
```

___

| Anterior                                                                                   |                        | Siguiente |
| ------------------------------------------------------------------------------------------ | ---------------------- | --------- |
| [Creación y Autenticación de Usuarios - Parte 4](P11T4_Creacion_Autenticacion_Usuarios.md) | [Readme](../README.md) |           |
