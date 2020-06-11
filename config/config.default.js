/**
 * 基础配置
 */
const path = require('path');

module.exports = appInfo => ({
  keys: 'maoyanfe2020',
  // 日志相关的配置
  logger: {
    consoleLevel: 'DEBUG',
    dir: path.join(appInfo.baseDir, 'logs')
  },
  // 静态资源相关的配置
  static: {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'public')
  },
  // 启用的中间件
  middleware: [
    'access',
  ],
  // 安全相关的配置
  security: {
    csrf: {
      ignoreJSON: true,
    }
  }
});
