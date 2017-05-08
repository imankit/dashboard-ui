var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isHosted = process.env['CLOUDBOOST_HOSTED'];

console.log('isHosted : ' + isHosted)

var config = {
    entry: './app/index.js',

    output: {
        path: './public',
        filename: '/client.min.js'
    },
   externals:{
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
   },
    debug: isHosted === 'false' || !isHosted
        ? true
        : false,
    //  devtool: isHosted === 'false' || !isHosted ? "#eval-source-map" : false,
    resolve: {
        root: [
            path.resolve(__dirname, './app')
        ],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }, {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    plugins: [
                        'transform-decorators-legacy', "transform-class-properties"
                    ],
                    presets: ['es2015', 'react', "stage-0"]
                }
            }, {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    plugins: [
                        'transform-decorators-legacy', "transform-class-properties"
                    ],
                    presets: ['es2015', 'react', "stage-0"]
                }
            }
        ]
    },
    plugins: (isHosted == "true" || isHosted == true)
        ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new HtmlWebpackPlugin({template: 'index.template.ejs', inject: 'body', hash: true})
        ]
        : [new HtmlWebpackPlugin({template: 'index.template.ejs', inject: 'body', hash: false})]
}

module.exports = config;
