const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "/"), 
        open: true,
        port: 8888
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    module: {
        // rules: [{
        //     test: /\.js$/,
        //     exclude: /(node_modules)/,
        //     loader: 'babel-loader'
        // }]
    }
}