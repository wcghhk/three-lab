import path from 'path'

module.exports = {
    entry: './index.js',
    output: {
        filename: './bundle.js',
        path: __dirname
    },
    devServer: {
        contentBase: path.join(__dirname, "./"), 
        open: true
    }
}