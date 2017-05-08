# Makefile for rainbow build

all:
	@echo "------------------------------------------"
	@echo "rainbow build manager"
	@echo "------------------------------------------"
	@echo "make build: create dist folder"
	@echo "make update: update npm package"
	@echo "make dev: start dev server"
	@echo "------------------------------------------"

master-check:
	git pull
	git status | grep "On branch" > /dev/null 2>&1

build: master-check
	yarn build
	gulp publish

update: master-check
	yarn

dev: master-check
	yarn dev
