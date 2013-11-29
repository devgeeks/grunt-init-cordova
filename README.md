# grunt-init-cordova

#### Grunt init template to create a Grunt-based build/workflow for Apache Cordova cli-generated projects

## Requirements

- Node and npm - [http://nodejs.org/](http://nodejs.org/)
- Cordova CLI - [https://github.com/apache/cordova-cli/](https://github.com/apache/cordova-cli/)
- Grunt - [http://gruntjs.com/](http://gruntjs.com/)
- Grunt-init - [https://github.com/gruntjs/grunt-init](https://github.com/gruntjs/grunt-init) - see: [http://gruntjs.com/project-scaffolding](http://gruntjs.com/project-scaffolding)

## Installation

#### Start out by installing the non-npm dependencies required above:

- Go to [http://nodejs.org/](http://nodejs.org/) and download and install node.js if you haven't already

Then install the global npm dependencies – depending how you installed node.js, you might need to use `sudo` before any of the `-g` – global – npm installs:

- `npm install -g cordova` (assuming you haven't already, this is all you need to create cordova projects)
- `npm install -g grunt-cli` - this will give us the `grunt` command that will be the backbone of our build set-up
- `npm install -g grunt-init` - this is the tool for initialising a Grunt.js workflow in your project using templates like this one.

#### Now clone this repo:

- `git clone https://github.com/devgeeks/grunt-init-cordova.git`

Now, if you run `grunt init`, under "currently-available init templates" you should now have an entry called "cordova"

If everything worked and you have the cordova template available, you are ready to use it with the [cordova-cli](https://github.com/apache/cordova-cli/) tool to get your new project up and running.

#### Create a new cordova project using the cli tool:

The `cordova create` command takes a path / destination dir, a package ID (in reverse-domain format) and the name of the app.

- `cordova create ./MyNewProject org.devgeeks.mynewproject MyNewProject` 
- `cd ./MyNewProject`
- `cordova platform add ios` and/or `cordova platform add android`, etc

*NOTE: this init template uses a folder called `./src` as the source folder if you choose to have one. It then sets up Grunt tasks to concatenate and minify those files and place the concatenated and minified files in `./www/js/MyNewProject.js` and  `./www/js/MyNewProject.min.js` respectively. You will also have to answer "y" to the init question about concatenation. If this doesn't suit your workflow, but you do still wish to be set up for concatenation and/or minification – i.e.: you don't have a `./src` folder – it will just create empty tasks for concatenation and minification for you to fill out.*

#### Next, it's time to init the project with grunt:

- `grunt-init <path/to/this/repo>`
  - This will ask you some questions about your project (usually, the defaults are fine) and create some files like a `Gruntfile.js` file and a `package.json` file.

#### After initialising, you need to install the dependencies:

- `npm install` - This should install some grunt task plugins and their requirements

#### That's it! You are ready to roll:

##### Commands:

`grunt` (default command): runs the lint task, the concat and min tasks (if you decided you wanted them) and runs the jasmine tests that come with the cordova default example project created in the `www` folder when creating the project.

`grunt jshint`: lints the files in `www/js` using jshint.

`grunt debug:ios`: runs `cordova build ios && cordova emulate ios` to run up your project in the iOS Simulator (requires [ios-sim](https://github.com/phonegap/ios-sim)).

`grunt debug:android`: runs `cordova build android && cordova emulate android` to run up your project in the Android Emulator.

`grunt debug:blackberry10`: runs `cordova build blackberry10 && cordova emulate blackberry10` to run up your project in the Blackberry environment (NOTE: this still needs the flags added...).

`grunt watch`: watches the files in you jshint list for changes and runs `grunt jshint` – and concatenation and minification, if you chose it – when triggered.



