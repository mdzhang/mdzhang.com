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
        * TODO

* Update files in the `data` folder with your personal information
* Regenerate your sitemap
  * upload to Google Webmaster

### The `data` folder

This folder contains information specific to you or your project.

#### Resources

* How to set up [Google Analytics](https://support.google.com/analytics/answer/1008080)
* How to verify your site with [Google Webmaster](https://www.google.com/webmasters/)
* How to verify with [Keybase](https://keybase.io/)
* How to verify with [Pinterest]()
* How to verify with [Web of Trust](https://www.mywot.com/wiki/Verify_your_website)

## Development

To begin development:

* Start a local server to build, process, and serve the site files
    ```
    bundle exec middleman server
    ```

## Deployment

TODO

## Authors

**Michelle D. Zhang**

  * <http://github.com/mdzhang>

## Copyright

Code copyright 2015 Michelle D. Zhang.
