var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => {
        nodeModules[mod] = `commonjs ${mod}`;
    });

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

module.exports = {
    // The configuration for the server-side rendering
    name: 'server',
    target: 'node',
    entry: './server.js',
    output: {
        filename: 'server-webpack.js'
    },
    externals: nodeModules,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),
    ]
};

if (isProd) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            drop_console: true,
            sourceMap: false,
            mangle: true,
        })
    );
}