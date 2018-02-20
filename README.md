# [mdzhang.com](http://mdzhang.com)

This repository holds the code for my personal website, [mdzhang.com](http://mdzhang.com). Built using [Hugo](https://gohugo.io/)

| Circle CI | Dependencies | Code Climate | Test Coverage | Documentation | License |
| --------- | ------------ | ------------ | ------------- | ------------- | ------- |
| [![CircleCI](https://circleci.com/gh/mdzhang/mdzhang.com.svg?style=shield)](https://circleci.com/gh/mdzhang/mdzhang.com) | [![Dependency Status](https://gemnasium.com/badges/github.com/mdzhang/mdzhang.com.svg)](https://gemnasium.com/github.com/mdzhang/mdzhang.com) | [![Code Climate](https://codeclimate.com/github/mdzhang/mdzhang.com/badges/gpa.svg)](https://codeclimate.com/github/mdzhang/mdzhang.com) | [![Test Coverage](https://codeclimate.com/github/mdzhang/mdzhang.com/badges/coverage.svg)](https://codeclimate.com/github/mdzhang/mdzhang.com/coverage) | [![Inline docs](http://inch-ci.org/github/mdzhang/mdzhang.com.svg?branch=development)](http://inch-ci.org/github/mdzhang/mdzhang.com) | [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]() |

## Table of Contents

* [Installation](#installation)
* [Development](#development)
* [Deployment Setup](#deployment-setup)
* [Deployment](#deployment)
* [Authors](#authors)
* [License](#license)

## Installation

* Clone the repository
    ```sh
    git clone https://github.com/mdzhang/mdzhang.com.git
    ```

* Ensure you have Node version 8.9.2

* Ensure you have `yarn` installed
    ```sh
    npm install -g yarn
    ```

* Install dependencies
    ```sh
    yarn
    ```

* Ensure you have `hugo` installed
    ```sh
    brew install hugo
    ```

* Init the git submodule with the theme
    ```sh
    make init
    ```

* Start a local server
    ```sh
    make start
    ```

### Code Linting

TODO

### Testing

N/A beyond making sure the `hugo` build passes.

## Deployment Setup

This project uses [S3](https://aws.amazon.com/s3/) to store the generated static site files, and [Route 53](https://aws.amazon.com/route53/) as a DNS service.

See S3 setup instructions [here](http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html)

## Deployment

Get S3 credentials to deploy your site. Either ask a project admin for `$AWS_ACCESS_KEY_ID` and `$AWS_SECRET_ACCESS_KEY` or [generate them yourself](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).

#### Manual Deployment From Host Machine

* Build the site
    ```sh
    HUGO_BASEURL=http://mdzhang.com hugo
    ```
* Ensure `$AWS_ACCESS_KEY_ID` and `$AWS_SECRET_ACCESS_KEY` are defined in your environment
* Run e.g.
    ```sh
    yarn deploy
    ```

#### Continuous Deployment

* Reuse the existing `circle.yml` file, which will redeploy staging when the `development` branch is updated, and will redeploy production when the `master` branch is updated.
* [Add `$AWS_ACCESS_KEY_ID` and `$AWS_SECRET_ACCESS_KEY` to CircleCI](https://circleci.com/docs/environment-variables/#setting-environment-variables-for-all-commands-without-adding-them-to-git
).

## Authors

**Michelle D. Zhang**

  * <http://github.com/mdzhang>

## License

Copyright (c) 2013-2018 Michelle D. Zhang. MIT Licensed, see [LICENSE](LICENSE) for details.
