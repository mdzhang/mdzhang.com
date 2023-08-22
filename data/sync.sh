#!/bin/bash
#

set -o errexit

die()
{
    BASE=$(basename -- "$0")
    echo -e "${RED} $BASE: error: $@ ${NC}" >&2
    exit 1
}

# Checking dependencies
command -v jq >/dev/null 2>&1 || die "jq is required but not installed. Aborting. See https://stedolan.github.io/jq/download/"
command -v dasel >/dev/null 2>&1 || die "dasel is required but not installed. Aborting. See https://github.com/TomWright/dasel"

dasel -r csv -w json -f goodreads_library_export.csv | jq -c -r '.[] | select(.["Exclusive Shelf"] == "read") | { author: .Author, _id: .["Book Id"],  bookshelves: .Bookshelves | split(", "), date_read: .["Date Read"],  isbn: .ISBN | gsub("[^0-9]"; ""), isbn13: .ISBN13 | gsub("[^0-9]"; ""), my_rating: .["My Rating"],  publication_year: .["Original Publication Year"],  publisher: .Publisher, title: .Title, pages: .["Number of Pages"], _type: "book" }'
