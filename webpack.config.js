const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageMeta = require('./package.json')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/frontend/index.jsx',
    resolve: {
    extensions: ['.js', '.jsx']
    },
    module: {
    rules: [
        {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader' // will use .babelrc
        },
        {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        }
    ]
    },
    output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
    },
    plugins: [
    new HtmlWebpackPlugin({
        title: packageMeta.title
    })
    ]
}