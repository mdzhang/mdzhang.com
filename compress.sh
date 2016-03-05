#!/bin/bash

export S3_BUCKET=mdzhang.com

FILES_TO_COMPRESS=(
  'js/scripts.min.js'
  'css/tidy.min.css'
  'index.html'
  'error.html'
)

for i in "${FILES_TO_COMPRESS[@]}"
do
  s3cmd put --acl-public --add-header='Content-Encoding:gzip' public/build/$i.gz s3://${S3_BUCKET}/$i
done