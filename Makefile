
# start a local development server
start:
	gatsby develop

lint:
	npm run lint:js
	npm run lint:md
	npm run lint-good

format:
	npm run format:js

# build static assets to be uploaded to S3 into public/
build:
	gatsby build
