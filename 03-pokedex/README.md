<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Tabla de contenidos

- [Ejecutar en Desarrollo](#ejecutar_en_desarrollo)
- [Stack Usado](#stack_usado)
- [Contenido Estatico](#contenido_estatico)
- [Docker](#docker)
  - [Docker Hub](#docker_hub)
  - [docker-compose.yml](#docker-compose_yml)
  - [Levantar Imagen Docker](#levantar_imagen_docker)


# Ejecutar_en_desarrollo
1. Clonar repositorio
2. Ejecutar

    `npm i` | `npm install`

3. Tener instalado nest CLI
4. Levantar la base de datos

  `docker-compose up -d`

# Stack_Usado
* MongoDb
* Nest
# Contenido_Estatico

 Con contenido estatico me refiero a crear una pagina index html que se servirá al entrar a `{endpoint}:{PORT}`

 Para hacer esto se debieron hacer ciertas cosas

 1. instalar paquete `@nestjs/serve-static`
 2. Agregar el import correspondiente en app.modules
 
```
imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    })
  ]
```

3. Crear una carpeta public en la raiz del proyecto con su css y html respectivo
4. Llamar el endpoint base




# Docker

## Docker_Hub
* [Docker Hub](https://hub.docker.com/)
* En esta pagina podemos conseguir las imagenes de docker que necesitemos

## docker-compose_yml
* En el caso de que no bajemos la imagen desde docker hub, podemos hacerlo con un archivo yaml en el root del proyecto

````
docker-compose.yml
version: '3'
services:
  db:
    image: mongo:5
    restart: always
    ports:
      - 27017:27017
    environment:
      - MONGODB_DATABASE=nest-pokemon
    volumes:
      - ./mongo:/data/db
````

## Levantar_imagen_docker
Para levantar la imagen, en el terminal debes escribir el comando:
`docker-compose up` o `docker-compose up -d`

NOTA: `Asegurar que la aplicación de docker esté corriendo`

>docker-compose up:

    Muestra en tiempo real los registros de salida (logs) de los contenedores en la terminal.
    Los logs y mensajes de los servicios se imprimen directamente en la terminal, lo que puede ser útil para monitorear y depurar.

>docker-compose up -d:

    No muestra los registros de salida en tiempo real en la terminal.
    Los contenedores se ejecutan en segundo plano (modo "detached").
    Una vez que los servicios se inician correctamente, el control se devuelve a la terminal y se puede seguir trabajando sin que los logs aparezcan en pantalla.
    Es útil para situaciones donde no necesitas ver los logs continuamente y deseas liberar la terminal para otras tareas.