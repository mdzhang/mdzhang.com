#!/bin/bash

export S3_BUCKET=mdzhang.com

flags=""

if [ "$#" -eq 1 ]; then
  case $1 in
    # pass in --dry-run flag
    --dry-run )
      shift
      flags=--dry-run
      ;;
    * )
      echo "Unrecognized flag: ${1}"
      exit 1
  esac
fi

FILES_TO_COMPRESS=(
  'js/scripts.min.js'
  'css/tidy.min.css'
  'index.html'
  'error.html'
)

if [ -z "$flags" ]; then
  for i in "${FILES_TO_COMPRESS[@]}"
  do
    s3cmd sync --acl-public \
      --add-header='Content-Encoding:gzip' \
      --add-header="Cache-Control: max-age=86400" \
      public/build/$i.gz s3://${S3_BUCKET}/$i
  done
else
  for i in "${FILES_TO_COMPRESS[@]}"
  do
    s3cmd sync --acl-public "${flags}" \
      --add-header='Content-Encoding:gzip' \
      --add-header="Cache-Control: max-age=86400" \
      public/build/$i.gz s3://${S3_BUCKET}/$i
  done
fi