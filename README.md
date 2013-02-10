# grunt-init-cordova

### Grunt init template for Apache Cordova cli-generated projects

## Requirements

- Node and npm - [http://nodejs.org/](http://nodejs.org/)
  - Node package manager for Grunt Add-ons
- PhantomJS - [http://phantomjs.org/](http://phantomjs.org/)
  - Headless webkit for running tests
- Cordova CLI - [https://github.com/apache/cordova-cli/](https://github.com/apache/cordova-cli/)
  - Cordova / PhoneGap command line interface
- Grunt - [http://gruntjs.com/](http://gruntjs.com/)
  - Build tool for minimising, running and tests

## Installation

Start out by installing the non-npm dependencies required above:

- Go to [http://nodejs.org/](http://nodejs.org/) and download and install node.js if you haven't already
- Go to [http://phantomjs.org/](http://phantomjs.org/) and download and install PhantomJS (again, if you haven't already)

Then install the global npm dependencies (depending how you installed node.js, you might need to use `sudo` before any of the global (-g) npm installs):

- `npm install -g cordova`
  - After installing the Cordova cli tool, you will get a message to run a `sudo chown` command on the cordova installation dir. This step is **very** important, do not skip it.
- `npm install -g grunt`
  - this will give us the `grunt` command that will be the backbone of our build set-up (note: when grunt reaches 0.4.0 stable, some of this might change as it's install process has changed)

Now clone this repo into your grunt userDir:

- `mkdir -p ~/.grunt/tasks/init` (just in case)
- `git clone https://github.com/devgeeks/grunt-init-cordova.git ~/.grunt/tasks/init`
- NOTE: if you already have some custom templates, you might have to clone the repo somewhere else and copy the `cordova.js` and `cordova` folder to `~/.grunt/tasks/init`

If you run `grunt init`, under "currently-available init templates" you should now have an entry called "cordova"




