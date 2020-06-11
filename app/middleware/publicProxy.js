const proxy = require('koa-proxy');

// 开发环境代理client端的资源
module.exports = () => proxy({
  host: 'http://127.0.0.1:3000',
  match: /^\/public\//,
});
