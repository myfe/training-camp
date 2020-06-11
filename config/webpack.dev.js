const webpack = require('webpack');
const merge = require('webpack-merge');
const open = require('opn');
const webpackConfigBase = require('./webpack.config');

const host = '127.0.0.1'; // 本地开发host

const port = 3000; // 本地开发webpack端口

const eggPort = 8080; // 本地开发egg端口，如果用了egg.js，浏览器地址要用egg端口

let openBrowser = true; // 启动Webpack后是否自动打开浏览器

// devServer自带的open不能打开egg端口的页面，并且不能准确判断是否编译完
class OnBuildDonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('OnBuildDonePlugin', () => {
      if (openBrowser) {
        setTimeout(() => {
          openBrowser = false;
          open(`http://${host}:${eggPort}/`, { app: 'Google Chrome' }).catch(err => {
            console.log('Open browser error:');
            console.log(err);
          });
        }, 1);
      }
    });
  }
}

const webpackConfigDev = {
  devServer: {
    contentBase: './', // lib，framework从这里得到的
    publicPath: '/public/',
    host,
    port,
    progress: true,
    // historyApiFallback: true,
    inline: true,
    overlay: true, // 浏览器页面上显示错误
    clientLogLevel: 'error',
    stats: {
      assets: false,
      entrypoints: false,
      modules: false,
      children: false, // turn off `mini-css-extract-plugin` logs
      warningsFilter: /^chunk commons/, // filter `chunk commons [mini-css-extract-plugin]`
    }
  },
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    new OnBuildDonePlugin(),
  ],
};

module.exports = merge(webpackConfigBase, webpackConfigDev);
