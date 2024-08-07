# E-Commerce Application

## Descripción

Esta es una aplicación de e-commerce desarrollada con [NestJS](https://nestjs.com/). Permite a los usuarios registrarse, iniciar sesión y comprar productos. La autenticación se realiza mediante JWT, y la aplicación cuenta con rutas públicas y privadas, así como protección de roles (admin y user). La documentación de la API está disponible en Swagger.

## Tecnologías Utilizadas

- **Backend:** NestJS
- **Base de Datos:** PostgreSQL con TypeORM
- **Autenticación:** JWT
- **Documentación:** Swagger
- **Almacenamiento de Archivos:** Cloudinary

## Instalación

1. Clona el repositorio:
```bash
  git clone <URL_DEL_REPOSITORIO>
```

2. Instala las dependencias:

```bash
  npm install
```

3. Crea un archivo .env en la raíz del proyecto con las siguientes variables:

```bash
  DB_POST=<tu_puerto_db>
  DB_HOST=<tu_host_db>
  DB_USERNAME=<tu_usuario_db>
  DB_PASSWORD=<tu_contraseña_db>
  DB_DATABASE=<tu_nombre_db>
  CLOUDINARY_CLOUD_NAME=<tu_cloudinary_cloud_name>
  CLOUDINARY_API_KEY=<tu_cloudinary_api_key>
  CLOUDINARY_API_SECRET=<tu_cloudinary_api_secret>
  CLOUDINARY_URL=<tu_cloudinary_url>
  JWT_SECRET=<tu_secreto_jwt>
```

## Instalación

Para preparar la base de datos y cargar los datos iniciales, sigue estos pasos:

1. Genera una migración:

```bash
  npm run migrations:generate <ruta_donde_se_guardara_la_migracion>
```

2. Compila el proyecto:

```bash
  npm run build
```

3. Ejecuta la migración:

```bash
  npm run migrations:run
```

4. Ejecuta la aplicación:

```bash
  npm run start
```

5. Carga los datos iniciales:
  - Ejecuta el endpoint POST /categories/seeder para cargar las categorías.
  - Ejecuta el endpoint POST /products/seeder para cargar los productos.


## Documentación

La API está documentada con Swagger. Puedes acceder a la documentación en:

```bash
  http://localhost:3000/api
```



