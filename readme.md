## challenge-Insta-store
En este proyecto encontrarás una funcionalidad.
La cual permite a un cliente optener la tienda más cercana, esta funcionalidad recibe como parámetros
datos del cliente y su ubicación.


### Mapa de las funcionalidades:
https://donde_se_ponga_la_documentacion

### Comandos:
```bash
npm run build           # Compila el código en /dist
npm run start # Iniciar modo tsc-watch en modo 'production'
npm run dev # Iniciar modo tsc-watch en modo 'development'
npm run prod  # Iniciar modo tsc-watch y con nodemon en modo 'production'
npm run test # Aquí correrian los tests... ¡!
```

### Endpoints:
#### ❤️✔️ Healh Check
```js
GET `http://localhost:${PORT}/`
RESPONSE: { ok: true }
```
#### 📦 para optener la tienda mas cercana
```js
POST `http://localhost:${PORT}/api/v1/stores/closest-store`
{
  authorization: 'Bearer eyJh...',
}
BODY:
{
  timezone: "America/Bogota",
  current_coordinates : [40.712776, -74.005974]
  user: {
    _id: "60d5ec49f1b3c72f8c8a2b61",
    current_coordinates : {
      latitude: 40.712776,
      longitude:  -74.005974
    }
  }
}

RESPONSE: {
  "storeId": "12345",
  "storeName": "Tienda Cercana",
  "storeName": "Tienda de Conveniencia Cercana",
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

### Fecha de estimacion de entrega:
3 días => 2024-06-17T13:00:00Z
