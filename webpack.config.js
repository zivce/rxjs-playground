const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: `${__dirname}/build`,
        filename: 'bundle.js'
    }, 
    devtool: "source-map",
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          },
          {
            test: /\.css/,
            use: [ 'style-loader', 'css-loader' ]
          }
        ]
    }
}