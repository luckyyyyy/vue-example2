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
	git status | grep "On branch master" > /dev/null 2>&1

build: master-check
	npm run build
	gulp publish

update: master-check
	npm install

dev: master-check
	npm run dev
