GRUNT = ./node_modules/.bin/grunt
BOWER = ./node_modules/bower/bin/bower
S3_BUCKET = mdzhang.com

build: clean bower grunt

bower:
	${BOWER} install

grunt:
	${GRUNT}

clean:
	rm -rf public/build

open:
	python -m SimpleHTTPServer 8000 &
	open http://localhost:8000/public/build/


deploy-test:
	grunt prodbuild && \
	s3cmd --dry-run --delete-removed --acl-public --exclude='*' \
		--include-from=deploy_files/copy_files.txt sync 'public/build/' s3://$(S3_BUCKET)/ && \
	./compress.sh --dry-run

# TODO: overwrites gzipped index.html with raw index.html, then compress.sh rewrites with gzipped index.html
#       so we end up syncing when we don't really need to
deploy:
	grunt prodbuild && \
	s3cmd --delete-removed --acl-public --exclude='*' \
		--include-from=deploy_files/copy_files.txt sync 'public/build/' s3://$(S3_BUCKET)/ && \
	./compress.sh

.PHONY: build bower grunt clean open deploy-test deploy