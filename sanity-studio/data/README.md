# Data

## Goodreads

Public API was disabled in 2020 :(

Go to <https://www.goodreads.com/review/import> to start an Export, then wait until e.g. `Your export from MM/DD/YYYY - HH:SS` appears underneath & download the resulting CSV.

Then, enter this directory & e.g.

```sh
$ ./sync.sh

✔ [100%] Fetching available datasets
✔ [100%] Reading/validating data file (77ms)
✔ [100%] Importing documents (19.58s)
Done! Imported 645 documents to dataset "production"
```
