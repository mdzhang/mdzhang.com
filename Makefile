S3_BUCKET=mdzhang.com

.PHONY: site
site:
	make html
	make css

.PHONY: css
css:
	sass --update styles:tmp/css

# Build the html pages from jade templates
.PHONY: html
html:
	make clean && \
	jade ./templates --out ./tmp/html

# Sync current working directory with s3.
.PHONY: deploy
deploy:
	make clean && \
	make html && \
	s3cmd sync --delete-removed --acl-public -n \
		--exclude '*' \
		--exclude '*.*' \
		--include 'js/*' \
		--include 'css/*' \
		--include 'resources/*' \
		--include 'index.html' \
		./ s3://$(S3_BUCKET)/

.PHONY: clean
clean:
	find . -name "*.html" -exec rm -rf {} \;
