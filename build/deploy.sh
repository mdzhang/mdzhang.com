#!/bin/sh
# See http://s3tools.org/s3cmd

S3_BUCKET=mdzhang.com

# Sync current working directory with s3.
#
s3cmd sync --delete-removed --acl-public --exclude '.git/*' ./ s3://$S3_BUCKET/
