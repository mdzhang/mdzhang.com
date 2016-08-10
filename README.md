# [mdzhang.com](http://mdzhang.com)

This repository holds the code for my personal website, [mdzhang.com](http://mdzhang.com)

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

    * configure node
        ```
        echo 'if which nodenv > /dev/null; then eval "$(nodenv init -)"; fi' >> $HOME/.bashrc
        source ~/.bashrc

        nodenv install -s $(cat ./.node-version)
        nodenv global $(cat ./.node-version)

        npm install
        ```

    * configure deployment (s3)
        * see how to [Host a Static Website on Amazon Web Services](http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html)
        * setup your `.s3_sync` file, using `.s3_sync.sample` as a reference

* Update files in the `data` folder with your personal and project information
* Remove or update the following files
    * `source/google9c723a7692fdf206.html` to verify with [Google Webmaster](https://www.google.com/webmasters)
    * `source/mywot116d689c1efc0de389b9.html` to verify with [Web of Trust](https://www.mywot.com/)
    * `source/keybase.txt` to verify with [Keybase](https://keybase.io/)
    * `source/assets/files/MichelleZhangResume.pdf`
    * `source/assets/images/favicon.ico`

## Development

Start a local server to build, process, and serve the site files

```
./bin/rake start
```

### Code Linting

To lint your code before commit, and test it before push

```
./bin/rake lint:install
./bin/rake lint:sign
```

## Deployment

Just run

```
./bin/rake deploy:[environment]
```

Where environment is one of `staging` or `production`

Which you can test beforehand with

```
./bin/rake deploy:dry:[environment]
```

## Authors

**Michelle D. Zhang**

  * <http://github.com/mdzhang>

## Copyright

Code copyright 2015 Michelle D. Zhang.