## challenge-Insta-store
Esta API contiene servicios para autenticación el cual permite a los usuarios iniciar sesión de forma segura utilizando Basic Auth. Tambien permite la busqueda de tiendas cercanas eficientemente mediante el uso de un índice 2dsphere en MongoDB el cual permite busquedas basadas en coordenadas geográficas.
Adicional se almacena la consultas generadas a la funcionalidad de busqueda para llevar un registro.

### Mapa de las funcionalidades:
http://localhost:3000/api-docs/

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

## Ejecución del Proyecto

- Correr compilar el proyecto en /dist:
    ```sh
    npm run build
    ```

- Correr el proyecto de develop:
    ```sh
    npm run dev
    ```
- Correr el proyecto de local:
    ```sh
    npm run local
    ```
- Correr el proyecto de produccion:
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

### Endpoints:
#### ❤️✔️ Healh Check
```js
GET `http://localhost:${PORT}/`
RESPONSE: { ok: true }
```

#### 📦 Autenticación 🔐

- **URL**: `/api/v1/auth/login`
- **Método**: `POST`
- **Headers**:
  - `Authorization`: `Basic dGVzdEBnbWFpbC5jb206MTIz` (Este es un ejemplo codificado en Base64)
- **Respuestas**:
  - `200`: Inicio de sesión exitoso.
  - `401`: No autorizado.

##### Ejemplo de llamada al endpoint

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

### Ejemplo Login desde un framework frontend
```js
    const credentials = btoa(`${email}:${password}`);
    const response = await fetch('http://localhost:3001/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });
```

#### 📦 Para optener la tienda mas cercana

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

### Fecha de estimacion de entrega 🗓
3 días => 2024-06-17T13:00:00Z
