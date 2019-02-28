

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageJSON = require('./package.json');
const webpack = require('webpack');

module.exports = {
  entry: {
    index:'./src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },

  mode:'development',
  devtool:'eval-source-map',

  resolve:{
    modules: ['node_modules', 'src/kiwi', 'src/kiwi/static']
  },
  
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 8080,
    hot:true
  },
  

  module: {
    rules: [
      
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },


      {      
        test: /\.scss$/,
        use: [
          'style-loader',//MiniCssExtractPlugin.loader,
          {loader:"css-loader", options:{ sourceMap:true } },
          {loader:"sass-loader", options:{ sourceMap:true } },
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options:{
            name: 'img/[name].[ext]'
          }
        }]
      },

      // RAW STRINGS
      {
        test:/snippet\.html$/,
        use: [
          'raw-loader'
        ]
      },

      // FONTS
      {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       }
    
    ]
  },
  plugins:[
    new CleanWebpackPlugin(['build'],{}),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      favicon:'./src/assets/img/favicon.png'
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
  ]
};