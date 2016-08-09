MIDDLEMAN = bundle exec middleman

all:
	echo "Not implemented"

clean:
	rm -rf ./build

test:
	bundle exec rspec

start:
	${MIDDLEMAN} server

build:
	${MIDDLEMAN} build

s3_sync:
	${MIDDLEMAN} s3_sync

s3_sync_dry_run:
	${MIDDLEMAN} s3_sync --dry_run

deploy: build s3_sync

deploy-test: build s3_sync_dry_run

.PHONY: all clean test start build s3_sync s3_sync_dry_run deploy deploy-test