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
  "storeName": "Tienda de Conveniencia Cercana",
  "isOpen": true,
  "coordinates": {
    "latitude": 19.432608,
    "longitude": -99.133209
  },
  "nextDeliveryTime": "2024-06-14T15:30:00Z"
}
```


### Fecha de estimacion de entrega:
3 días => 2024-06-17T13:00:00Z