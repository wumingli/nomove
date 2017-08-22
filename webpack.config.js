const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'dev';

module.exports = {
  entry: {
    main: './js/index',
    list: './js/list',
    search: './js/search',
    news: './js/news',
    college: './js/college',
    detail: './js/detail',
    concat: './js/concat',
    team: './js/team',
    about: './js/about',
    sale: './js/sale',
    indexSearch: './js/index-search'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    //filename: '[name].[hash].js',
    //filename: 'static/js/[name].js',
    //filename: `${isDev ? '' : 'js/'}[name].js`,
    //library: '[name]_[chunkhash]',
    //publicPath: `${isDev ? '' : './'}`,
  },
  externals: ['$', 'jquery'],
  resolve: {
    extensions: ['.config.js', '.js', '.json', '.jsx'],
    /*alias: {
      assets: path.resolve('images/'),
    }
    root: [
      path.resolve('./components')
    ]*/
  },
  module: {
    loaders: [
      {
        test: /\.(png)|(jpg)|(webp)$/,
        //loader: [`file-loader?limit=4192&name=${isDev ? '' : 'images/'}[md5:hash:base64:10].[ext]`]
        loader: [`file-loader?limit=4192&name=${isDev ? '' : 'images/'}[name].[ext]`]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader']
        }),
      },
      {
        test: /\.(html)$/i,
        loader: 'html-withimg-loader',
      },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" }
    ]
  },
  plugins: [
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),*/
    new CleanPlugin('./dist'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new WebpackMd5Hash(),

    /*new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "main.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字
    }),

    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname,
    }),*/

    new ExtractTextPlugin({
      //filename: `${isDev ? '' : 'css/'}[name].css`,
      filename: '[name].css',
      allChunks: false
    }),
    CopyWebpackPlugin([
      {
        from: 'libs/',
        to: 'libs/'
      },
      {
        from: 'images/',
        to: 'images/'
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: ['body', 'head'],
      chunks: ['main'],
      /*minify: {
        removeComments: true,
        collapseWhitespace: true
      }*/
    }),
    new HtmlWebpackPlugin({
      filename: 'list.html',
      template: './list.html',
      chunks: ['list'],
      inject: ['body', 'head'],
      /*minify: {
       removeComments: true,
       collapseWhitespace: true
       }*/
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: './search.html',
      chunks: ['search'],
      inject: ['body', 'head'],
      /*minify: {
       removeComments: true,
       collapseWhitespace: true
       }*/
    }),
    new HtmlWebpackPlugin({
      filename: 'news.html',
      template: './news.html',
      chunks: ['news'],
      inject: ['body', 'head'],
      /*minify: {
       removeComments: true,
       collapseWhitespace: true
       filename: 'college.html',
       template: './college.html',
       chunks: ['college'],
       }*/
    }),
    new HtmlWebpackPlugin({
      filename: 'college.html',
      template: './college.html',
      chunks: ['college'],
      inject: ['body', 'head'],
      /*minify: {
       removeComments: true,
       collapseWhitespace: true
       }*/
    }),
    //新闻详情页
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: './detail.html',
      chunks: ['detail'],
      inject: ['body', 'head'],
      /*minify: {
       removeComments: true,
       collapseWhitespace: true
       }*/
    }),
    //联系我们
    new HtmlWebpackPlugin({
      filename: 'concat.html',
      template: './concat.html',
      chunks: ['concat'],
      inject: ['body', 'head'],
      /*minify: {
       removeComments: true,
       collapseWhitespace: true
       }*/
    }),
    //专业团队
    new HtmlWebpackPlugin({
      filename: 'team.html',
      template: './team.html',
      chunks: ['team'],
      inject: ['body', 'head'],
      /*minify: {
       removeComments: true,
       collapseWhitespace: true
       }*/
    }),
    //关于我们
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: './about.html',
      chunks: ['about'],
      inject: ['body', 'head'],
      /*minify: {
       removeComments: true,
       collapseWhitespace: true
       }*/
    }),
    //热销新房
    new HtmlWebpackPlugin({
      filename: 'sale.html',
      template: './sale.html',
      chunks: ['sale'],
      inject: ['body', 'head'],
      /*minify: {
       removeComments: true,
       collapseWhitespace: true
       }*/
    }),
    //热销新房
    new HtmlWebpackPlugin({
      filename: 'index-search.html',
      template: './index-search.html',
      chunks: ['indexSearch'],
      inject: ['body', 'head'],
      /*minify: {
       removeComments: true,
       collapseWhitespace: true
       }*/
    }),
  ],
  devServer: {
    disableHostCheck: true
  },
};
