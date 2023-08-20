start:
	HUGO_BASEURL=http://mdzhang.com hugo server -D --ignoreCache

# set HUGO_BASEURL
build:
	hugo --minify

deploy:
	aws s3 sync --acl public-read ./public s3://$$HUGO_BASEURL

clean:
	rm -rf resources public
