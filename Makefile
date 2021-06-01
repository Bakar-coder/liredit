build-app:
	cd ./nginx && ${MAKE} build && \
	cd ../client && ${MAKE} build && \
	cd ../server && ${MAKE} build && \
	docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password -v postgres_data:/var/lib/postgres/data --name postgres postgres:13.3-alpine && \
	docker run -d -p 6379:6379 -v redis_data:/data --name redis redis:6.2.3-alpine && \
	docker run -d -p 3000:3000 --name client web_client:latest && \
	docker run -d -p 8080:8080 --name server web_server:latest