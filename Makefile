
NPM ?= npm

build: node_modules
	@$(NPM) run build

watch: node_modules
	@$(NPM) run watch

node_modules: package.json
	@$(NPM) install -qs

