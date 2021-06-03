build:
	docker-compose up -d --build
	
detroy:
	docker-compose down && docker system prune -a