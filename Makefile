.DEFAULT_GOAL := help

help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

clean:
	@docker-compose down --remove-orphans

yarn: ## Run bash in a Node container
	@docker run --rm -it -v $(shell pwd):$(shell pwd) -w $(shell pwd) node bash

yarn-install: ## Install yarn dependencies
	@docker run --rm -it -v $(shell pwd):$(shell pwd) -w $(shell pwd) node yarn install --frozen-lockfile

assets-dev: yarn-install ## Build assets for dev environment
	@docker run --rm -it -v $(shell pwd):$(shell pwd) -w $(shell pwd) node yarn encore dev --watch

assets-prod: yarn-install ## Build assets for prod environment
	@docker run --rm -it -v $(shell pwd):$(shell pwd) -w $(shell pwd) node yarn encore prod

dev: clean ## Start all containers
	@docker-compose up -d --build --force-recreate

install: assets-prod dev
	@docker-compose exec app composer install -o