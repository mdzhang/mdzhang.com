# [mdzhang.com](http://mdzhang.com)

[![CircleCI](https://circleci.com/gh/mdzhang/mdzhang.com.svg?style=shield)](https://circleci.com/gh/mdzhang/mdzhang.com)
[![Vulnerabilities](https://snyk.io/test/github/mdzhang/mdzhang.com/badge.svg)](https://snyk.io/test/github/mdzhang/mdzhang.com)

This repository holds the code for my personal website, [mdzhang.com](http://mdzhang.com).
Built using [Hugo](https://gohugo.io/)

## Setup

* Clone the repository
    ```sh
    git clone https://github.com/mdzhang/mdzhang.com.git
    ```

* Install `node`
    ```sh
    brew install asdf
    asdf plugin-add nodejs
    asdf plugin-add terraform
    asdf plugin-add terraform-docs
    asdf plugin-add tflint
    asdf install
    ```

* Install `yarn`
    ```sh
    npm install -g yarn
    ```

* Install dependencies
    ```sh
    yarn
    ```

* Install `hugo`
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
