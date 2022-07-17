# [mdzhang.com](http://mdzhang.com)

[![GH Action](https://github.com/mdzhang/mdzhang.com/actions/workflows/deploy.yml/badge.svg)](https://github.com/mdzhang/mdzhang.com/actions/workflows/deploy.yml)

This repository holds the code for my personal website, [mdzhang.com](http://mdzhang.com).

Built using [Hugo](https://gohugo.io/)

## Setup

* Clone the repository
    ```sh
    git clone https://github.com/mdzhang/mdzhang.com.git
    ```

* Install [`hugo`](https://gohugo.io/)
    ```sh
    brew install hugo
    ```

* Init the git submodule with the theme
    ```sh
    make init
    ```

## Development

* Start a local server
    ```sh
    make start
    ```

### Code Linting

TODO

### Testing

N/A beyond making sure the `hugo` build passes.

## Deploy

See [Deploy](DEPLOY.md).
