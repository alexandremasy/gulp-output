// Requirements
var map = require('map-stream');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');

// Helper function
function errorMessage(message)
{
    throw new gutil.PluginError('gulp-template', message);
}

/**
 *  Format the output for the given file
 *
 *  @param path String
 *  @param filename String
 *  @param extension String
 **/
function defaultFormator( path, filename, extension )
{
    return path+'\n';
}

/**
 *  Write the data to the requested file
 *
 *  @param file String
 *  @param data String
 **/
function writeTemplate( file, data )
{
    fs.writeFileSync( file, data );
}

// Plugin function
module.exports = function(options) 
{
    // Reset file list
    var content = '';

    // Prepare options
    options = options || {};
    options.formator = !options.formator ? defaultFormator : options.formator;
    options.root = !options.root ? __dirname : options.root;

    if (!options.destination)    
        errorMessage('A destination is required. Please refer to the docs.');

    options.destination = path.resolve(options.destination);

    // Process files
    return map( function(file, callback) 
    {
        // Let empty files pass
        if (file.isNull())
            return callback(null, file);

        // Emit error for streams
        if (file.isStream())
            errorMessage('Streams are not supported');

        // Retrieve filename
        var p = file.path;
        if ( options.root.length > 0 && p.indexOf( options.root ) == 0 )
            p = p.substr( options.root.length );

        var filename = path.basename(file.path);
        var extension = path.extname(filename);

        // append the content of the bundle
        if ( !content[options.bundleName] )
            content[options.bundleName] = '';

        content += options.formator( p, filename, extension );

        // write data
        writeTemplate( options.destination, content );

        if (options.log)
            gutil.log('Wrote filename:', gutil.colors.green(filename));

        callback(null, file);
    } );
};