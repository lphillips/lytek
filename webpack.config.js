'use strict';

// import Webpack plugins
var cleanPlugin = require('clean-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

// define Webpack configuration object to be exported
var config = {
    context: __dirname + '/src',
    entry: './bootstrap/bootstrap.js',
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'bower': __dirname + '/app/bower_components',
            'approot': __dirname + '/src',
            'assets': __dirname + '/src/assets',
            'components': __dirname + '/src/components',
            'shared': __dirname + '/src/shared',
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.(woff|woff2)$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.(eot|svg|ttf|png)$/,
            loader: 'file'
        }, {
            test: /\.js?$/,
            loader: 'ng-annotate!babel?presets[]=es2015!jshint',
            exclude: /node_modules|bower_components/
        }],
        preLoaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'jshint'
        }]
    },
    plugins: [
        new cleanPlugin(['app']),
        new ExtractTextPlugin('styles.css'),
        //        new webpack.optimize.UglifyJsPlugin({
        //            compress: {
        //                warnings: false
        //            }
        //        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;