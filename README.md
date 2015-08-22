## mdzhang.com

This repository holds the code for my personal website, mdzhang.com

### Installation

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

### Development

To begin development:

* Start the asset compiler
    ```
    make build
    ```

* and in a new tab, open the static index.html file in your browser:
    ```
    make open
    ```

### Deployment

Just run

```
make deploy
```

TODO: deployment logs