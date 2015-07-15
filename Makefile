S3_BUCKET = mdzhang.com
GRUNT = ./node_modules/.bin/grunt
BOWER = ./node_modules/bower/bin/bower

build: bower grunt

bower:
	${BOWER} install

grunt:
	${GRUNT}

clean:
	rm -rf public/build

# Sync current working directory with s3.
.PHONY: deploy
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
