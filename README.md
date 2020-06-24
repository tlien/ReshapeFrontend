# ReshapeFrontend

## Web interface for Reshape's microservice-based image-processing software

### Prerequisites
1. [docker desktop](https://www.docker.com/products/docker-desktop)
3. That's it! ( ͡° ͜ʖ ͡°)ﾉ⌐■-■

### How to run
Firstly, **make sure that the [backend](https://github.com/tlien/ReshapeBackend/) is running**. This application runs on an external network created and owned by the backend application. 

Run development mode with the command: 
> `docker-compose up`

### How to use
Once the docker-compose up command has been run for both the frontend and backend projects (backend found [here](https://github.com/tlien/ReshapeBackend/))
the following will be available:

> \<container name> | \<url>

**The super basic frontend of the application, use this for testing the login and authorization.**
> `reshapefrontend_spa_1` | `localhost:5300`

**The identity server url, it provides login/logout and a simple diagnostics view of the logged-in user.**
> `reshapebackend_identity.svc_1` | `localhost:5200`

**The account API, it will redirect to a Swagger UI where the various endpoints of this API can be called. Remember to login with the _Authorize_-button and check all scopes.**
> `reshapebackend_acc.api_1` | `localhost:5002`

**Same as above except it's the business management API.**
> `reshapebackend_bm.api_1` | `localhost:5001`

**The API gateway exposes an aggregated Swagger UI, unfortunately authentication hasn't been setup for it yet, meaning only anonymous endpoints can be called - of which there currently are none.**
> `reshapebackend_bm.api_1` | `localhost:5000`

<br />

The following databases (postgres) will be available:\
**Identity Server persisted grants and device codes DB.**
> `reshapebackend_identity.db_1` | `localhost:5433`

**Business management API DB.**
> `reshapebackend_bm.db_1` | `localhost:5434`

**Account API DB.**
> `reshapebackend_acc.db_1` | `localhost:5435`

Database names are for the three databases are `identityservice`, `businessservice`, `accountservice` respectively.

Either use the [pgadmin](https://www.pgadmin.org/download/) management ui tool to inspect (user/pwd: postgres/example).\
or use the console tool (psql) with the command:\
`docker exec -it <container name> psql -U postgres`\
Useful psql commands:
```
\l to list available databases
\c <database_name> to connect to a database (database names can be found in the docker compose files)
\d to list database tables
```
Otherwise basic syntax, e.g: `select * from <table_name>;`

<br />

The RabbitMQ instance can be found here:\
**Exposes a UI for managing and monitoring the RabbitMQ instance (user/pwd: guest/guest).**
> `reshapebackend_rabbitmq_1` | `localhost:5100`
