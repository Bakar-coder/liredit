build-app:
	cd ./nginx && ${MAKE} build  && \
	cd ../client && ${MAKE} build && \
	cd ../server && ${MAKE} build

run-prod:
	docker compose up -d --build
	
remove-prod:
	docker compose down -v --remove-orphans --rmi local && docker volume prune -f && docker network prune -f
