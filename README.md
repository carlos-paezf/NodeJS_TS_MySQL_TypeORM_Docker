# Curso NodeJS con TypeScript y TypeORM

[![wakatime](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/cb8f4b90-770f-46db-8895-01008d95e95f.svg?style=for-the-badge)](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/cb8f4b90-770f-46db-8895-01008d95e95f?style=for-the-badge)

## Tecnologías a implementar

- ***POO*** (Programación Orientada a Objetos (OOP por sus siglas en inglés))
- ***Docker Compose*** como base de datos
- Configuración de TypeScript
- Configuración de rutas, controladores, servicios y entidades.

## Instalación de dependencias

Con el comando a continuación, instalamos las siguientes dependencias: `class-validator`, `class-transformer`, `cors`, `dotenv`, `express`, `morgan`, `mysql`, `typeorm`, `typeorm-naming-strategies`, `typescript`, `colors`.

```txt
npm install class-validator class-transformer cors dotenv express morgan mysql typeorm typeorm-naming-strategies typescript colors
```

También necesitamos instalar algunas dependencias que solo funcionaran durante del desarrollo, pero no entraran en producción, ya sea por qué solo funciona como tipado o son dependencias que nos ayudan durante la creación del proyecto: `cors`, `express`, `morgan`, `concurrently`, `nodemon`.

```txt
npm install -D @types/cors @types/express @types/morgan concurrently nodemon
```

## Documentación paso a paso

- [Creando una aplicación de servidor - Parte 1](DOC/P1T1_Creando_Aplicacion_Servidor.md "P1T1")
- [Creando una aplicación de servidor - Parte 2](DOC/P1T2_Creando_Aplicacion_Servidor.md "P1T2")
- [Router de nuestra aplicación](DOC/P2T1_Router_Aplicacion.md "P2T1")
- [Configuración de entorno de nuestra aplicación](DOC/P3T1_Configuracion_Entorno.md "P3T1")
- [Docker Compose y TypeORM (Base de Datos)](DOC/P4T1_Docker_Compose_TypeORM.md "P4T1")
- [Arquitectura y Relaciones de Entidades - Parte 1](DOC/P5T1_Arquitectura_Relaciones_Entidades.md "P5T1")
- [Arquitectura y Relaciones de Entidades - Parte 2](DOC/P5T2_Arquitectura_Relaciones_Entidades.md "P5T2")
- [Implementación de Servicios](DOC/P6T1_Implementacion_Servicios.md "P6T1")
- [Manejo de Errores y Respuestas](DOC/P7T1_Manejo_Errores_Respuestas.md "P7T1")
- [TypeORM 0.3.6 (Latest Version)](DOC/P8T1_TypeOrm_0.3.6.md "P8T1")
- [Configurando Migraciones con TypeORM 0.3.6](DOC/P8T2_TypeOrm_0.3.6.md "P8T2")
- [Relaciones con Servicios y Controladores](DOC/P9T1_Relaciones_Servicios_Controladores.md "P9T1")
- [Middleware de Validación de Datos](DOC/P10T1_Middleware_Validacion_Datos.md "P10T1")
- [Password Hashing y Query Builders - Parte 1](DOC/P11T1_Password_Hashing_Query_Builders.md "P11T1")
- [Servicio de Autenticación - Parte 2](DOC/P11T2_Servicio_Autenticacion.md "P11T2")
- [Passport Local y JWT - Parte 3](DOC/P11T3_Passport_Local_JWT.md "P11T3")
- [Creación y Autenticación de Usuarios - Parte 4](DOC/P11T4_Creacion_Autenticacion_Usuarios.md "P11T4")
- [Crear imagen de Docker para NodeJS y TypeScript](DOC/P12T1_Crear_Imagen_Docker.md "P12T1")
