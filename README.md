# grunt-init-cordova

### Grunt init template to create a Grunt-based build/workflow for Apache Cordova cli-generated projects

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

#### Start out by installing the non-npm dependencies required above:

- Go to [http://nodejs.org/](http://nodejs.org/) and download and install node.js if you haven't already
- Go to [http://phantomjs.org/](http://phantomjs.org/) and download and install PhantomJS (again, if you haven't already)

Then install the global npm dependencies (depending how you installed node.js, you might need to use `sudo` before any of the global (-g) npm installs):

- `npm install -g cordova` (assuming you haven't already, this is all you need to create cordova projects)
  - After installing the Cordova cli tool, you will get a message to run a `sudo chown` command on the cordova installation dir. This step is **very** important, do not skip it.
- `npm install -g grunt`
  - this will give us the `grunt` command that will be the backbone of our build set-up (note: when grunt reaches 0.4.0 stable, some of this might change as it's install process has changed)

#### Now clone this repo into your grunt userDir:

- `mkdir ~/.grunt` (just in case), then:  
- `git clone https://github.com/devgeeks/grunt-init-cordova.git ~/.grunt/`

NOTE: if you already have some custom templates or anything else in `~/.grunt`, you might have to clone the repo somewhere else and copy the `cordova.js` and `cordova` folder to `~/.grunt/tasks/init`

Now, f you run `grunt init`, under "currently-available init templates" you should now have an entry called "cordova"

If everything worked and you have the cordova template available, you are ready to use it with the [cordova-cli](https://github.com/apache/cordova-cli/) tool to get your new project up and running.

#### Create a new cordova project using the cli tool:

`cordova create ~/Desktop/MyNewProject org.devgeeks.mynewproject MyNewProject`  
`cd ~/Desktop/MyNewProject`
`cordova platform add ios` and/or `cordova platform add android`, etc

#### Next, it's time to init the project with grunt:

- `grunt init:cordova`
  - This will ask you some questions about your project (usually, the defaults are fine) and create some files like a `grunt.js` file, a `package.json` file and a `README.md` for good measure.

#### After initialising with grunt, you need to install the dependencies:

- `npm install`
  - This should install some grunt plugins and their requirements

#### That's it! You are ready to roll:

##### Commands:

`grunt` (default command): runs the lint task, the concat and min tasks (if you decided you wanted them) and runs the jasmine tests that come with the cordova default example project created in the `www` folder when creating the project.

`grunt jasmine`: runs tests in `www/spec` using the `www/spec.html` file.

`grunt lint`: lints the files in `www/js` using jshint.

`grunt debug:ios`: runs `cordova build ios && cordova emulate ios` to run up your project in the iOS Simulator (requires [ios-sim](https://github.com/phonegap/ios-sim)).

`grunt debug:android`: runs `cordova build android && cordova emulate android` to run up your project in the Android Emulator.

`grunt debug:blackberry`: runs `cordova build blackberry && cordova emulate blackberry` to run up your project in the Blackberry environment (ignorant of the dev env, much? feel free to send me a pull req with the right name).

`grunt watch`: watches the files in `www/js` and the grunt file itself for changes and runs `grunt lint` and `grunt test` when triggered.



