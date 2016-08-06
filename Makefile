GRUNT = ./node_modules/.bin/grunt
BOWER = ./node_modules/bower/bin/bower
CLEAN = rm -rf public/build
S3_BUCKET = mdzhang.com

build: npm bower grunt

npm:
	npm prune && npm install

bower:
	${BOWER} install

grunt:
	${GRUNT}

clean:
	${CLEAN}

open:
	python -m SimpleHTTPServer 8000 &
	open http://localhost:8000/public/build/

watch:
	${GRUNT} watch

lint:
	${GRUNT} lint

deploy-test:
	${CLEAN} && ${GRUNT} build && \
	s3cmd --dry-run --delete-removed --acl-public --exclude='*' \
		--include-from=deploy_files/copy_files.txt sync 'public/build/' s3://$(S3_BUCKET)/ && \
	./compress.sh --dry-run

deploy:
	${CLEAN} && ${GRUNT} build && \
	s3cmd --delete-removed --acl-public --exclude='*' \
		--include-from=deploy_files/copy_files.txt sync 'public/build/' s3://$(S3_BUCKET)/ && \
	./compress.sh

.PHONY: build npm bower grunt clean open watch lint deploy-test deploy