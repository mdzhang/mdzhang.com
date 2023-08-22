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

dasel -r csv -w json -f goodreads_library_export.csv | jq -c -r '
    .[]
    | select(.["Exclusive Shelf"] == "read")
    | {
        author: .Author,
        _id: .["Book Id"],
        shelves: .Bookshelves | split(", "),
        readAt: (.["Date Read"] | gsub("\/"; "-") + "T00:00:00Z"),
        isbn: .ISBN | gsub("[^0-9]"; "") | (if . == "" then null else tonumber end),
        isbn13: .ISBN13 | gsub("[^0-9]"; "") | (if . == "" then null else tonumber end),
        myRating: .["My Rating"] | (if . == "" then null else tonumber end),
        publicationYear: .["Original Publication Year"] | (if . == "" then null else tonumber end),
        publisher: .Publisher,
        title: .Title,
        pages: .["Number of Pages"] | (if . == "" then null else tonumber end),
        _type: "book"
    }' > books.json

cd ..

npx sanity dataset import data/books.json production --replace
