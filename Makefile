build-app:
	cd nginx && ${MAKE} build  && \
	cd ../client && ${MAKE} build && \
	cd ../server && ${MAKE} build

run-app:
	docker compose up -d
	
remove-app:
	docker compose down -v --remove-orphans --rmi local && docker volume prune -f && docker network prune -f
