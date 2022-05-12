# Curso NodeJS con TypeScript y TypeORM

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
