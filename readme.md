## Challenge-Insta-store
Esta API contiene servicios para autenticación el cual permite a los usuarios iniciar sesión de forma segura utilizando Basic Auth. Tambien permite la busqueda de tiendas cercanas eficientemente mediante el uso de un índice 2dsphere en MongoDB el cual permite busquedas basadas en coordenadas geográficas.
Adicional se almacena la consultas generadas a la funcionalidad de busqueda para llevar un registro.

### Estructura de Directorios
```bash
/src
  /modules
    /main
      /app
        server.ts
    /auth
      /services
        login.service.ts
        createToken.services.ts
      auth.routes.ts
      auth.controller.ts
    /clients
      /models
        client.interface.ts
      /schemas
        client.schema.ts
      /repository
        client.repository.ts
      /services
      client.routes.ts
      client.controller.ts
    /stores
      /models
        stores.interface.ts
      /schemas
        stores.schema.ts
      /services
        getClosestStore.service.ts
      /repository
        daoStores.repository.ts
        searchStoreTrack.repository.ts
      stores.controller.ts
      stores.routes.ts
  /common
    /config
      configMongoConnection.ts
      swaggerConfig.ts
    /adapter
      encrypting.ts
    /middlewares
      validateAuth.ts
    /utils
      /enums
      /helpers
  app.ts
/tests
  /auth
    auth.e2e.spec.ts
  /stores
    stores.e2e.spec.ts
```

### Arquitectura Basada en Módulos

#### Estructura de Directorios Organizada por Módulos:

Directorio principal /src que contiene todos los archivos fuente de tu aplicación.
Dentro de /src, esta el subdirectorio /modules que contiene los diferentes módulos funcionales de la aplicación (auth, clients, stores).

Ademas el modulo /main donde se encuentra el server.ts que se encarga de inicializar el servido de la aplicación.

#### Separación de Responsabilidades:
Cada módulo tiene su propia estructura de archivos dedicada:
 -  Models/Interfaces: Define las estructuras de datos y las interfaces que representan los objetos manejados por ese módulo.
 -  Schemas/Repositories: Define los esquemas de validacion de datos y las funciones del repositorio   para        interactuar con la base de datos.
 - Services: Contiene la lógica de negocio específica para el módulo.
 - Routes y Controllers: Define las rutas de API y los controladores que manejan las solicitudes

#### Capa Común (common):

Tienes un directorio /common que contiene funcionalidades compartidas entre los diferentes módulos:
- Config: Configuraciones globales como configuraciones de base de datos y configuración de Swagger.
- Adapter/Middlewares/Utils: Adaptadores, middlewares globales y utilidades comunes utilizadas en toda la aplicación.

#### Archivo Principal de la Aplicación:

app.ts ubicado en el directorio raíz /src y que se encarga de inicializar y configurar la aplicación de Express.

#### Directorio de Pruebas (Tests):
/tests
contiene pruebas de integración (e2e) para los diferentes módulos de tu aplicación (auth, stores).


### Mapa de las funcionalidades:
Consultar despues de correr el proyecto:  http://localhost:3000/api-docs/

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/Alex-ru-na/challenge-Insta-store.git
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd challenge-Insta-store
    ```

3. Instala las dependencias:
    ```sh
    npm install
    ```

## Ejecución del Proyecto (How to Run)

- Correr compilar el proyecto en /dist:
    ```sh
    npm run build
    ```

- Correr el proyecto para develop:
    ```sh
    npm run dev
    ```
- Correr el proyecto para local:
    ```sh
    npm run local
    ```
- Correr el proyecto para produccion:
    ```sh
    npm run build
    npm run start
    ```

## Ejecución de Tests
- Para ejecutar los tests, utiliza el siguiente comando:
    ```sh
    npm test
    ```
- Tests con detalles adicionales
    ```sh
    npm run test
    ```

## Endpoints:
### ❤️✔️ Healh Check
```js
GET `http://localhost:${PORT}/`
RESPONSE: { ok: true }
```

### 📦 Autenticación 🔐

- **URL**: `/api/v1/auth/login`
- **Método**: `POST`
- **Headers**:
  - `Authorization`: `Basic dGVzdEBnbWFpbC5jb206MTIz` (Este es un ejemplo codificado en Base64)
- **Respuestas**:
  - `200`: Inicio de sesión exitoso.
  - `401`: No autorizado.

#### Ejemplo de llamada al endpoint

```js
POST `http://localhost:${PORT}/api/v1/auth/login`
{
 "Authorization: Basic dGVzdEBnbWFpbC5jb206MTIz"
}

RESPONSE: {
  "user": {
    "_id": "666db388ea88728ce9819b4d",
    "email": "test@gmail.com",
    "name": "Cliente 1",
    "timezone": "America/Bogota",
    "location": {
      "iso3_country": "COL",
      "city": "Medellin",
      "state": "Antioquia",
      "coordinates": [ 6.244203, -75.581211]
    }
  },
  "token": "eyJhbG...",
  "msg": "token success",
  "ok": true
}
```

#### Ejemplo Login desde un framework frontend
```js
    const credentials = btoa(`${email}:${password}`);
    const response = await fetch(`http://localhost:${PORT}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });
```

####  Para optener la tienda mas cercana 📦

- **URL**: `/api/v1/stores/get/closer`
- **Método**: `POST`
- **Headers**:
- `Authorization`: `Bearer eyJhbGciOiJSUzI1...`

```js
POST `http://localhost:${PORT}/api/v1/stores/closest-store`
{
  authorization: 'Bearer eyJh...',
}
BODY:
{
  client: {
    timezone: "America/Bogota",
    current_coordinates : [40.712776, -74.005974]
  }
}

RESPONSE: {
  "storeId": "12345",
  "storeName": "Tienda Cercana",
  "isOpen": true,
  "coordinates": {
    "latitude": 19.432608,
    "longitude": -99.133209
  },
  "nextDeliveryTime": "2024-06-14T15:30:00Z"
}
```

## Estructura de las Colecciones en MongoDB
Breve resumen de la estructura de la base de datos

### Colección stores

Ejemplo de Documento:

```js
{
  "_id": ObjectId("666d4c3f7f9d2943dfc9b876"),
  "store_id": "1",
  "store_name": "Tienda A",
  "coordinates": {
      "type": "Point",
      "coordinates": [
          -99.133209,
          19.432608
        ]
  },
  "delivery_time": [
      "09:00",
      "23:00"
  ],
  "openingHours": {
      "monday": {
          "open": "08:00",
          "close": "22:00"
      },
      "tuesday": {
          "open": "08:00",
          "close": "22:00"
      }...
  }
}
```

#### Descripción de Campos:
- _id: Identificador único MongoDB.
- store_id: Identificador de la tienda.
- store_name: Nombre de la tienda.
- coordinates: Coordenadas geográficas de la ubicación de la tienda.
- type: Tipo de geometría (en este caso, "Point").
- coordinates: Array de coordenadas longitud y latitud.
- delivery_time: Horas de entrega disponibles.
- openingHours: Horario de apertura y cierre por día de la semana (monday a sunday):
    open: Hora de apertura.
    close: Hora de cierre.


```js
### Colección clients
{
    "_id" : ObjectId("666db388ea88728ce9819b4d"),
    "email" : "test@gmail.com",
    "hash" : "$2b$10$H5EaocuVv5Da34qsDpRR1uNIMVaycHbzmUBBiLze7lp2enyBnLEmW",
    "name" : "Cliente 1",
    "timezone" : "America/Bogota",
    "location" : {
        "iso3_country" : "COL",
        "city" : "Medellin",
        "state" : "Antioquia",
        "coordinates" : [
            6.244203,
            -75.581211
        ]
    }
}
```
#### Descripción de Campos:
- _id: Identificador único MongoDB.
- email: Correo electronico del cliente.
- hash: Contraseña encriptada del cliente.
- name: Nombre del cliente.
- timezone: Zona horaria del cliente.
- location: Ubicacion del cliente (datos a futuro).

### Colectión search_store_tracks
```js
{
    "_id" : ObjectId("666f191a02366ff43f7b78f5"),
    "request" : {
        "timezone" : "America/Bogota",
        "coordinates" : [
            40.7128,
            -74.006
        ]
    },
    "response" : {
        "storeId" : ObjectId("666d4c3f7f9d2943dfc9b876"),
        "storeName" : "Tienda A",
        "isOpen" : true,
        "coordinates" : [
            -99.133209,
            19.432608
        ],
        "nextDeliveryTime" : "2024-06-16T23:00:00.000Z"
    },
    "client" : {
        "_id" : "666db388ea88728ce9819b4d",
        "email" : "test@gmail.com",
        "timezone" : "America/Bogota",
        "iat" : 1718547995,
        "exp" : 1718634395,
        "token" : "eyJhb..."
    },
    "date" : ISODate("2024-06-16T16:55:54.467Z"),
    "error" : null
}
```
#### Descripción de Campos:
- _id: Identificador único MongoDB.
- request: Request completa del endpoint.
- response: Respueta completa del endpoint.
- date: Fecha y hora en la que se genero la busqueda.
- error: Error generando en una busqueda (opcional).

## Tecnologías Utilizadas 🖥
- Node.js
- Express
- TypeScript
- MongoDB
- Jest (pruebas)
- Swagger (documentación de API)

## Contribuciones 👨‍💻
Si deseas contribuir a este proyecto, por favor sigue estos pasos:

- Haz un fork del proyecto.
- Crea una nueva rama (git checkout -b feature/new-endpoint).
- Realiza tus cambios y haz un commit (git commit -m 'feat: new endpoint example').
- Sube tus cambios a tu fork (git push origin feature/new-endpoint).
- Genera un Pull Request, puedes nombras tus 2 remotos origin (tu fork) y upstream (original).

## Fecha de estimacion de entrega 🗓
3 días => 2024-06-17T13:00:00Z


## Improvements and Trade-offs
Detalles sobre mejoras posibles y compromisos considerados, consultar el archivo [improvements_and_tradeoffs.md](./improvements_and_tradeoffs.md).
