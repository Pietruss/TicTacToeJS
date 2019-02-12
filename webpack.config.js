const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');



module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('style.css')
    ]
};