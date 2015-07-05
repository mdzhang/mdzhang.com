S3_BUCKET=mdzhang.com

# Sync current working directory with s3.
deploy:
	s3cmd sync --delete-removed --acl-public \
		--exclude '*' \
		--exclude '*.*' \
		--include 'js/*' \
		--include 'css/*' \
		--include 'images/*' \
		--include 'files/*' \
		--include 'index.html' \
		./ s3://$(S3_BUCKET)/

.PHONY: clean
clean:
	find . -name "*~" -exec rm -rf {} \;
