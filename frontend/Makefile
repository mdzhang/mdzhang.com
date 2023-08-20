start:
	yarn dev

build:
	astro build

deploy:
	aws s3 sync --acl public-read ./public s3://$$BASEURL

clean:
	rm -rf dist
