## Confiugracion e instalacion

Crear archivo `.env` y llenarlo con las variables de entorno como en el archivo ejemplo `.env.sample` , por ahora solo contiene los datos de conexion de la base de datos y tu JWT_SCRETE que es para el login

### Instalacion

```
  npm install
  npm run dev
  # El servidor Corre en http://localhost:3000
```

Para hacer una prueba puedes utilizar postman para hacer una GET request a http://localhost:3000/api/v1 y si tienes algun usuario registrado en la base de datos te deberia dar ese resultado :3

### Potgres Hosting

#### clever cloud

```


PG_HOST = bx00yak7db3oxhhngkfn-postgresql.services.clever-cloud.com
PG_USER = u64cw2rxiunsc4cwslrt
PG_PASSWORD = 8XoPjTVuKmWXd132Pddo
PG_DATABASE = bx00yak7db3oxhhngkfn

```

#### Elephant SQL

```

PG_HOST = ruby.db.elephantsql.com
PG_USER = ixaqngoe
PG_PASSWORD = vJUaUsD_IBWskL1NjiHJVX20zWiSQoDM
PG_DATABASE = ixaqngoe

```
