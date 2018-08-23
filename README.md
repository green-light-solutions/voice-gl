# Voice.gl microsite

* we use Yarn instead of NPM
* run `yarn` to download and install dependencies
* run `grunt` which will start project on `http://localhost:3000`
* run `grunt build` to build the project into `./dist`
* run `grunt lint` to check your code formatting

# Dev environment

* will transpile your code from ESX to JS and from SASS to CSS
* will minify and bundle your code
* will run your application on dev server with livereload
* will watch your files and will rebuild your app automatically
* will check your code formatting before commit

# How to install dependencies

* Install dependency using `yarn add ...`
* Add path to dependency JS file(s) into `Gruntfile.js` into `libs` array
* Import dependency CSS/SCSS files in `main.scss` file
