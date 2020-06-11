const path = require('path');
// minicss 要在 html 前面
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const development = process.env.NODE_ENV === 'development';

const webpackConfig = {
  mode: development ? 'development' : 'production',
  entry: {
    home: './web/projects/home/index.js'
  },
  output: {
    path: path.resolve('./public'),
    filename: development ? 'js/[name].js' : 'js/[name].[chunkhash:6].js',
    chunkFilename: development ? 'js/[name].js' : 'js/[name].[chunkhash:6].js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    },
    {
      test: /\.less/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            modifyVars: {
              'font-size-base': '12px',
            },
            javascriptEnabled: true
          }
        }
      ]
    },
    {
      test: /\.(png|ico|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: development ? 'img/[name].[ext]' : 'img/[name].[hash:8].[ext]',
      }
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: development ? 'font/[name].[ext]' : 'font/[name].[hash:8].[ext]',
      }
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: development ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: development ? 'css/[id].css' : 'css/[name].[contenthash:8].css'
    }),
    new CleanWebpackPlugin({
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]
};

// 获取html-webpack-plugin参数的方法
function getHtmlConfig(name, chunks) {
  return {
    template: './web/index.html',
    filename: `${name}.html`,
    inject: true,
    favicon: './web/asset/favicon.ico',
    // hash: true,
    chunks,
    minify: development ? false : {
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
      removeAttributeQuotes: true, // 去除属性引用
    },
  };
}

// 配置页面，根据config.entry自动生成吧
// eslint-disable-next-line
for (const page in webpackConfig.entry) {
  const htmlConfig = getHtmlConfig(page, ['vendors', 'common', page]);
  webpackConfig.plugins.push(new HtmlWebpackPlugin(htmlConfig));
}
if (development) {
  webpackConfig.devtool = 'eval-source-map';
}

if (!development) {
  webpackConfig.optimization = {
    minimizer: [
      new TerserPlugin({
        parallel: 2,
        cache: true,
        sourceMap: true,
        terserOptions: {
          warnings: false,
          compress: {
            drop_debugger: false,
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      }),
      // 压缩css
      new OptimizeCssPlugin({
        cssProcessorOptions: {
          // mergeLonghand: false,
          map: { inline: false },
          safe: true
        }
      }),
    ],
    splitChunks: {
      chunks: 'all',   // initial、async和all
      minSize: 30000,   // 形成一个新代码块最小的体积
      maxAsyncRequests: 5,   // 按需加载时候最大的并行请求数
      maxInitialRequests: 3,   // 最大初始化请求数
      name: true,
      cacheGroups: {
        default: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,  //模块被引用2次以上的才抽离
          priority: -20
        },
        vendors: { // 项目基本框架等
          chunks: 'all',
          test: /react|react-router|redux|tangdao|prop-types|antd|catd/,
          priority: 100,
          name: 'vendors',
        }
      }
    }
  };
}

module.exports = webpackConfig;
