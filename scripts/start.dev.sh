echo "Start Server"
docker-compose -f docker-compose.dev.yml --env-file ./server/envs/.env.development up --build -d
