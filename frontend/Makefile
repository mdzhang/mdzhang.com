start:
	yarn dev

build:
	astro build

deploy:
	aws s3 sync --acl public-read ./dist s3://$$BASEURL

clean:
	rm -rf dist
