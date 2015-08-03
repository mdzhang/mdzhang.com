GRUNT = ./node_modules/.bin/grunt
BOWER = ./node_modules/bower/bin/bower
S3_BUCKET = mdzhang.com

build: clean bower grunt

bower:
	${BOWER} install

grunt:
	${GRUNT}

clean:
	rm -rf public/build/tmp

deploy:
	make build && \
	s3cmd sync --delete-removed --acl-public -n \
		--exclude '*' \
		--exclude '*.*' \
		--include 'public/build' \
		./ s3://$(S3_BUCKET)/

.PHONY: build bower grunt clean deploy