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

    * configure node
        ```
        echo 'if which nodenv > /dev/null; then eval "$(nodenv init -)"; fi' >> $HOME/.bashrc
        source ~/.bashrc

        nodenv install -s $(cat ./.node-version)
        nodenv global $(cat ./.node-version)

        npm install
        bower install
        ```

    * configure deployment (s3)
        * see how to [Host a Static Website on Amazon Web Services](http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html)
        * set your Access and Secret key
            ```
            s3cmd --configure
            ```
        * redefine S3_BUCKET in the Makefile

* Set up analytics
  * see how to set up [Google Analytics](https://support.google.com/analytics/answer/1008080) and
  * replace the script at the bottom of `pug/partials/head.pug` with the script they provide

* Verify with Google Webmaster
  * see [here](https://www.google.com/webmasters/) for further instructions
  * seplace the old `public/google9c723a7692fdf206.html` verification page with your new verification html page

* Add a sitemap
  * generate one e.g. [here](https://www.xml-sitemaps.com/])
  * replace the old `public/sitemap.xml`
  * upload it to [Google Webmaster Tools](https://www.google.com/webmasters/tools/sitemap-list)

* Verify with [WOT](https://www.mywot.com/)
  * see [here](https://www.mywot.com/wiki/Verify_your_website) for instructions
  * replace the old `public/mywot116d689c1efc0de389b9.html`

* Verify with [Keybase](https://keybase.io/)
  * verify
      ```
      brew install keybase
      keybase prove http mdzhang.com
      ```
  * replace old `public/keybase.txt`

* Update `deploy_files/copy_files.txt` to reflect updated Google Webmaster, WOT, and Keybase files

* Update `pug/partials/head.pug` with your own personal information

* Update `pug/partials/icons.pug` to link to your personal online identities

## Development

To begin development:

* Start the asset compiler and a local server to serve the site files, and open the files in your default browser
    ```
    make build && make open & make watch
    ```

* A shortcut for the above is
    ```
    npm start
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
