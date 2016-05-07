'use strict';

// import Webpack plugins
var cleanPlugin = require('clean-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var webpack = require('webpack');

// define Webpack configuration object to be exported
var config = {
    context: __dirname + '/src',
    entry: './core/bootstrap.js',
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'bower': __dirname + '/app/bower_components'
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.(woff|woff2)$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.(eot|svg|ttf)$/,
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
        new cleanPlugin(['dist']),
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;