#!/bin/sh
# See http://s3tools.org/s3cmd

S3_BUCKET=mdzhang.com

# Sync current working directory with s3.
s3cmd sync --delete-removed --acl-public --dry-run \
  --exclude '*/*' \
  --include 'js/*' \
  --include 'css/*' \
  --include 'images/*' \
  --include 'files/*' \
  --include 'index.html' \
  ./ s3://$S3_BUCKET/
