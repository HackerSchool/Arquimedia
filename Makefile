all: clean deploy logs

build:
	docker compose -f docker-compose.yml -f docker-compose.override.yml build

deploy:
	docker compose -f docker-compose.yml -f docker-compose.override.yml up -d

logs:
	docker compose logs -f

logs-backend:
	docker logs -f backend-dev

logs-frontend:
	docker logs -f frontend-dev

shell-backend:
	docker exec -it backend-dev /bin/bash

clean:
	docker compose -f docker-compose.yml -f docker-compose.override.yml down --remove-orphans