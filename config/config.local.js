const localIP = require('ip').address();

module.exports = () => {
  const webpackPort = 3000;

  const domainWhiteList = [];
  [webpackPort].forEach(port => {
    domainWhiteList.push(`http://localhost:${port}`);
    domainWhiteList.push(`http://127.0.0.1:${port}`);
    domainWhiteList.push(`http://${localIP}:${port}`);
  });
  return {
    middleware: [
      'access',
      'publicProxy'
    ],
    security: {
      domainWhiteList
    },
    // 自定义配置项，在app/entend中用到了
    webpackPort,
  };
};
