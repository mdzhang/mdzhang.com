# [mdzhang.com](http://mdzhang.com)

[![Join the chat at https://gitter.im/mdzhang/mdzhang.com](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mdzhang/mdzhang.com?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This repository holds the code for my personal website, [mdzhang.com](http://mdzhang.com)

## Table of Contents

* [Installation](#installation)
* [Development](#development)
* [Deployment](#deployment)
* [Copyright and license](#copyright-and-license)

## Installation

* Make sure you have [Homebrew](http://brew.sh/) installed on your machine.
    ```
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

* Install Xcode Command Line Tools
    ```
    // You should get a popup to install Xcode Command Line Tools
    // if you don't already have it if you try the following command
    make
    ```

* Install the Node Package Manager
    ```
    brew install npm
    ```

* Clone the repository
    ```
    git clone https://github.com/mdzhang/mdzhang.com.git
    ```

* Install dependencies
    ```
    npm install -g grunt-cli
    npm install -g bower
    npm install
    bower install
    ```

* Set up deployment
  * See how to [Host a Static Website on Amazon Web Services](http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html)
  * Grab s3cmd to sync your repo with your S3 bucket
      ```
      brew install s3cmd
      ```
  * Configure s3cmd with your Access and Secret key
      ```
      s3cmd --configure
      ```
  * Redefine S3_BUCKET in the Makefile

* Set up analytics
  * See how to set up [https://support.google.com/analytics/answer/1008080?hl=en](Google Analytics) and replace the script at the bottom of head.jade with the script they provide

* Verify with Google Webmaster
  * See [https://www.google.com/webmasters/](here) for further instructions
  * Replace the old public/build/google9c723a7692fdf206.html verification page with your new verification html page

* Generate a sitemap for your page e.g. [https://www.xml-sitemaps.com/](here) and move new sitemap to public/build/sitemap.xml
  * Upload your sitemap to [https://www.google.com/webmasters/tools/sitemap-list](Google Webmaster Tools)

## Development

To begin development:

* Start the asset compiler and a local server to serve the site files, and open the files in your default browser
    ```
    make build & make open
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

## Creators

**Michelle D. Zhang**

  * <http://github.com/mdzhang>

## Copyright and License

Code copyright 2015 Michelle D. Zhang. Code released under the MIT license.
