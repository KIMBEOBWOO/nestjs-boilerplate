# Nest.js REST API Boilerplate

## Overview

This project is a boilerplate configured to make restapi easy to use through nest.js.
Includes only basic server configurations, such as database settings based on postgres, cache based on redis, and queue settings.

This project is currently incomplete and will continue to improve.
From the configuration items below, you can see what parts will be added in the future.

## **Configuration**

- [x] Config Service ([@nestjs/config](https://docs.nestjs.com/techniques/configuration))
- [x] [MessageQueue](https://docs.nestjs.com/techniques/queues)
- [x] Docker
- [x] [Database (typeorm)](https://docs.nestjs.com/techniques/database)
- [ ] Swagger
- [ ] i18
- [ ] e2e Test
- [ ] git action
- [ ] API versioning

## Set up

### clone project

```bash
git clone https://github.com/KIMBEOBWOO/nestjs-boilerplate.git
```

### set up postgres database

```bash
# start db-postgres with docker-compose file
docker-compose -f docker-compose.dev.yml up db-postgres --build -d

# access postgres docker container
☁ docker exec -it db-postgre-local /bin/bash

☁ /# psql -U postgres
☁ postgres=# CREATE USER {user_name} PASSWORD '{password}' SUPERUSER;
☁ postgres=# CREATE DATABASE {database name} OWNER root;
☁ postgres=# \l
```

### set up development env file

```bash
cat ./server/envs/.env.development

# init varaibles /server/envs/.env.development
# Set the database connection related environment variables
# and the redox connection environment variables.
POSTGRES_HOST=db-postgres
POSTGRES_PORT=5432
POSTGRES_USERNAME= #Value set above
POSTGRES_PASSWORD= #Value set above
POSTGRES_DATABASE= #Value set above

CACHE_HOST= redis
CACHE_PORT= 6379

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
```

All corresponding environment variables must be set. Otherwise, `EnvMissingError` occurs.

For redis, the `docker-compose` file is set to use the `REDIS_PASSWORD` set in the env file.

### start server

```bash
# stop
docker stop db-postgres

# start server
source ./scripts/start.dev.sh

# logs
docker logs -f nestjs-app
```

## Usage

### generate migration (TypeORM)

```bash
source ./migration.generate.sh \
dev \
src/database/data-sources/postgres.datasource.ts \
./src/database/migrations/{migration_file_name}
```

The first parameter should provide an environment to which migration will be applied, select `dev` or `prod`.

The second parameter provides the path to the data source file. If the path does not need to be received when executing the script file, substitute a string to the value of the corresponding variable.

The third parameter provides the path through which the migration file will be created.

### run migration (TypeORM)

```bash
source ./migration.run.sh \
dev \
./src/database/data-sources/postgres.datasource.ts
```

same as above
