## mdzhang.com

This repository holds the code for my personal website, mdzhang.com

### Installation

* Make sure you have [Homebrew](http://brew.sh/) installed on your machine.
    ```
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

* Install Xcode Command Line Tools
    ```
    // You should get a popup to install Xcode Command Line Tools if you don't already have it
    // if you try the following command
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

### Development

To begin development:
    ```
    // To build html/css/js files and watch/rebuild files on change
    make build
    ```

and in a new tab, open the static index.html file in your browser:
    ```
    make open
    ```