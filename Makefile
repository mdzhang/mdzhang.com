GRUNT = ./node_modules/.bin/grunt
BOWER = ./node_modules/bower/bin/bower
S3_BUCKET = mdzhang.com

build: clean bower grunt

bower:
	${BOWER} install

grunt:
	${GRUNT}

clean:
	rm -rf public/build/tmp && rm -f public/build/*.gz public/build/**/*.gz

open:
	python -m SimpleHTTPServer 8000 &
	open http://localhost:8000/public/build/


deploy-test:
	rm -rf public/build/tmp && \
	s3cmd sync --delete-removed --acl-public \
	--exclude 'styles.css' --exclude '*.gz' \
	-n 'public/build/' s3://$(S3_BUCKET)/

# TODO: overwrites gzipped index.html with raw index.html, then compress.sh rewrites with gzipped index.html
#       so we end up syncing when we don't really need to
deploy:
	grunt prodbuild && \
	rm -rf public/build/tmp && \
	s3cmd sync --delete-removed --acl-public \
	--exclude 'styles.css' --exclude '*.gz' \
	--add-header="Cache-Control: max-age=86400" \
	'public/build/' s3://$(S3_BUCKET)/  && \
	./compress.sh

.PHONY: build bower grunt clean open deploy-test deploy