const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const root = '/src/main/resources'
const src = `${root}/src`
const dest = `${root}/public`

module.exports = {
    entry: `.${src}/start.jsx`,
    output: {
        path: __dirname + dest,
        filename: './bundle.js'
    },
    devServer: {
        port: 9000,
        contentBase: `.${dest}`,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            },
        }
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],
    devtool: 'source-map',
    module: {
        loaders:[{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: '/node_modules/',
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-object-rest-spread', 'transform-decorators-legacy', 'transform-class-properties']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.woff|.woff2|.ttf|.eot|.svg|.png|.jpg*.*$/,
            loader: 'file'
        }]
    }
}