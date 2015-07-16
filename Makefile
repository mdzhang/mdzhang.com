S3_BUCKET = mdzhang.com
GRUNT = ./node_modules/.bin/grunt
BOWER = ./node_modules/bower/bin/bower

build: bower grunt

bower:
	${BOWER} install

grunt:
	${GRUNT}

open:
	open public/build/index.html

clean:
	rm -rf public/build

# Sync current working directory with s3.
deploy:
	make clean && \
	make build && \
	s3cmd sync --delete-removed --acl-public -n \
		--exclude '*' \
		--exclude '*.*' \
		--include 'js/*' \
		--include 'css/*' \
		--include 'resources/*' \
		--include 'index.html' \
		./ s3://$(S3_BUCKET)/

.PHONY: build open bower grunt clean deploy