# gulp-output [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> The gulp plugin which output filenames.

This gulp plugins discover the files in the given path, and output them in the way you define.

## Installation

```shell
npm install gulp-output --save-dev
```

## Usage

```
var output = require('gulp-output');

gulp.src( 'httpdocs/libs/**/*.js' )
    .pipe( output({
    	destination: 'template/libs.html',
    	root:__dirname+'/httpdocs/'
   	}) );
```

You also have the possibility to provile multiple path at one:

```
var output = require('gulp-output');

gulp.src( ['httpdocs/libs/**/*.js', 'httpdocs/otherlibs/*.js'] )
    .pipe( output({
    	destination: 'template/libs.html',
    	root:__dirname+'/httpdocs/'
   	}) );

```
## Usage

```
<stream> output(<options>);
```

## Options

**destination** `String`  

Where to output the result of the process

**formator** `Function`

This function will be called for each file found in the stream. The default formator will output the path of each file on a separate line. If you want to provide a custom output, define your own formator.
The function will be called with the following parameters:

- **path** `String` Path to the file
- **filename** `String` Filename
- **extension** `String` Extension of the file

Example to ouput for [jade](http://jade-lang.com)

```
function jadeFormator( path, filename, extension )
{
	return 'script(src="'+path+'")\n';
}

```
 
**root** `String`

All the retrieved file will have the full os path, this is often not convenient. By defining the root parameter, this root will be removed automatically from all the path. By default the root is equal to the directory of the `gulpfile.js`. 

[npm-url]: https://npmjs.org/package/gulp-output
[npm-image]: https://badge.fury.io/js/gulp-output.png
[travis-url]: https://travis-ci.org/ahsx/gulp-output
[travis-image]: https://travis-ci.org/ahsx/gulp-output.png?branch=master
[depstat-url]: https://david-dm.org/ahsx/gulp-output
[depstat-image]: https://david-dm.org/ahsx/gulp-output.png
[daviddm-url]: https://david-dm.org/ahsx/gulp-output.png?theme=shields.io
[daviddm-image]: https://david-dm.org/ahsx/gulp-output