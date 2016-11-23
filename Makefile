
NPM ?= npm

build: node_modules
	@$(NPM) run build

watch: node_modules
	@$(NPM) run watch

node_modules: package.json
	@$(NPM) install -qs

clean:
	rm -rf assets/bundle

dist-clean: clean
	rm -rf node_modules

