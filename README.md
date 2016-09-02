# [mdzhang.com](http://mdzhang.com)

This repository holds the code for my personal website, [mdzhang.com](http://mdzhang.com). Built using [Middleman](https://middlemanapp.com).

| Circle CI | Dependencies | Code Climate | Test Coverage | Documentation | License |
| --------- | ------------ | ------------ | ------------- | ------------- | ------- |
| [![CircleCI](https://circleci.com/gh/mdzhang/mdzhang.com.svg?style=svg)](https://circleci.com/gh/mdzhang/mdzhang.com) | [![Dependency Status](https://gemnasium.com/badges/github.com/mdzhang/mdzhang.com.svg)](https://gemnasium.com/github.com/mdzhang/mdzhang.com) | [![Code Climate](https://codeclimate.com/github/mdzhang/mdzhang.com/badges/gpa.svg)](https://codeclimate.com/github/mdzhang/mdzhang.com) | [![Test Coverage](https://codeclimate.com/github/mdzhang/mdzhang.com/badges/coverage.svg)](https://codeclimate.com/github/mdzhang/mdzhang.com/coverage) | [![Inline docs](http://inch-ci.org/github/mdzhang/mdzhang.com.svg?branch=development)](http://inch-ci.org/github/mdzhang/mdzhang.com) | [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]() |

## Table of Contents

* [Installation](#installation)
* [Development](#development)
* [Deployment](#deployment)
* [Authors](#authors)
* [Copyright](#copyright)

## Installation

* Make sure you have [Homebrew](http://brew.sh/) installed on your machine
    ```
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

* Make sure you have [git](https://git-scm.com/) installed
    ```
    brew install git
    ```

* Clone the repository
    ```
    git clone https://github.com/mdzhang/mdzhang.com.git
    ```

* Setup project
    ```
    cd mdzhang.com
    ./bin/setup
    ```

## Development

Start a local server to build, process, and serve the site files

```
./bin/rake start
```

### Code Linting

Code linting git hooks are automatically installed by `./bin/setup`. To kick the pre-commit hook off manually, you can run:

```
./bin/rake lint:run
```

### Testing

```
./bin/rake test
```

## Deployment

Just run

```
./bin/rake deploy -- -e [environment]
```

Where environment is one of `staging` or `production`

Which you can test beforehand with

```
./bin/rake deploy -- -d -e [environment]
```

You can run these from your local host's command line by setting up your S3 credentials in `.envrc`, or reuse the existing `circle.yml` file for continuous deployment, which will redeploy staging when the `development` branch is updated, and will redeploy production when the `master` branch is updated.

## Resources

* [Google Webmaster](https://www.google.com/webmasters)
* [Web of Trust](https://www.mywot.com/)
* [Keybase](https://keybase.io/)
* [Host a Static Website on Amazon Web Services](http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html)

## Authors

**Michelle D. Zhang**

  * <http://github.com/mdzhang>

## License

Copyright (c) 2013-2016 Michelle D. Zhang. MIT Licensed, see [LICENSE](LICENSE.md) for details.