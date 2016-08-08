MIDDLEMAN = bundle exec middleman
SHA_TAG = $(shell git rev-parse --verify HEAD)
ISO_TIME = $(shell ruby -e "require 'time'; puts DateTime.now.to_time.iso8601")

all:
	echo "Not implemented"

clean:
	rm -rf ./build

test:
	echo "TODO"

start:
	${MIDDLEMAN} server

compile:
	${MIDDLEMAN} build

version:
	echo "$(SHA_TAG)-$(ISO_TIME)" > ./build/version.txt

build: compile version

s3_sync:
	${MIDDLEMAN} s3_sync

s3_sync_dry_run:
	${MIDDLEMAN} s3_sync --dry_run

deploy: build s3_sync

deploy-test: build s3_sync_dry_run

.PHONY: all clean test start compile version build s3_sync s3_sync_dry_run deploy deploy-test