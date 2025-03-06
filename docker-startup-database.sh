#!/bin/bash

# Run PostgreSQL container
docker run --name postgres_container -e POSTGRES_PASSWORD=admin -p 9191:5432 -d postgres

# Run pgAdmin container
docker run --name pgadmin-container -p 5050:80 -e PGADMIN_DEFAULT_EMAIL=admin@admin.com -e PGADMIN_DEFAULT_PASSWORD=admin -d dpage/pgadmin4

echo "Containers started successfully!"