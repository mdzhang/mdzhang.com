# [mdzhang.com](http://mdzhang.com)

This repository holds the code for my personal website, [mdzhang.com](http://mdzhang.com)

## Table of Contents

* [Installation](#installation)
* [Development](#development)
* [Deployment](#deployment)
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
    cd mdzhang.com
    ```

* Install project dependencies
    ```
    brew tap Homebrew/bundle
    brew bundle
    ```

* Configure project dependencies

    * configure ruby
        ```
        echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> $HOME/.bashrc
        source ~/.bashrc

        rbenv install -s $(cat ./.ruby-version)
        rbenv global $(cat ./.ruby-version)

        gem update --system
        gem install bundler
        rbenv rehash

        bundle install
        ```

    * configure deployment (s3)
        * see how to [Host a Static Website on Amazon Web Services](http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html)
        * setup your `.s3_sync` file, using `.s3_sync.sample` as a reference

* Update files in the `data` folder with your personal information
* Remove or update the following files
    * `source/google9c723a7692fdf206.html` to verify with Google Webmaster
    * `source/mywot116d689c1efc0de389b9.html` to verify with Web of Trust
    * `source/keybase.txt` to verify with Keybase
    * `source/files/MichelleZhangResume.pdf`

## Development

To begin development:

* Start a local server to build, process, and serve the site files
    ```
    make start
    ```

## Deployment

Just run

```
make deploy
```

Which you can test beforehand with

```
make deploy-test
```

## Authors

**Michelle D. Zhang**

  * <http://github.com/mdzhang>

## Copyright

Code copyright 2015 Michelle D. Zhang.

## TODOs

- consider using `middleman-fontawesome` instead of using icomoon
- Dockerfile
- automatic deploy on merge with circle.ci
- move from Makefile to Rakefile?
- ruby, sass, haml, yml linting