echo "Start Server"
docker-compose -f docker-compose.prod.yml --env-file ./server/envs/.env.production up --build -d
