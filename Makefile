# Makefile for rainbow build


NPM=npm

all:
	@echo "------------------------------------------"
	@echo "rainbow build manager"
	@echo "------------------------------------------"
	@echo "make build: create dist folder"
	@echo "------------------------------------------"

master-check:
	git pull origin master
	git status | grep "On branch master" > /dev/null 2>&1

build: master-check
	$(NPM) run build
