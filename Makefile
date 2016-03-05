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

open:
	python -m SimpleHTTPServer 8000 &
	open http://localhost:8000/public/build/


deploy-test:
	s3cmd sync --delete-removed --acl-public --exclude 'styles.css' -n 'public/build/' s3://$(S3_BUCKET)/

deploy:
	s3cmd sync --delete-removed --acl-public --exclude 'styles.css' 'public/build/' s3://$(S3_BUCKET)/  && \
	./compress.sh

.PHONY: build bower grunt clean open deploy-test deploy