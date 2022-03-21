build:
	cd toolbox-backend && $(MAKE) build
	cd toolbox-frontend && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down