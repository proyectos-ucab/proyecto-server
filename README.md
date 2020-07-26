## Confiugracion e instalacion

Crear archivo `.env` y llenarlo con las variables de entorno como en el archivo ejemplo `.env.sample` , por ahora solo contiene los datos de conexion de la base de datos

### Instalacion

```
  npm install
  npm run dev 
  # El servidor Corre en http://localhost:3000
```

Para hacer una prueba puedes utilizar postman para hacer una GET request a http://localhost:3000/api/v1 y si tienes algun usuario registrado en la base de datos te deberia dar ese resultado :3
