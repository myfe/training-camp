/* eslint-disable no-case-declarations */
const Fs = require('fs');
const ejs = require('ejs');

// 指定ejs规则
ejs.delimiter = '?';
// 使用缓存
const renderCache = Object.create(null);

module.exports = {
  async renderPage(pageName, locals) {
    const { config } = this.app;
    let render = renderCache[pageName];
    // 如果缓存命中，则直接取出给body
    if (render) {
      this.body = renderCache[pageName];
    } else {
      let layout = '';
      switch (config.env) {
        // 开发环境: 从webpack端口抓取模板
        case 'local':
          layout = `http://127.0.0.1:${config.webpackPort}/public/${pageName}.html`;
          const res = await this.curl(layout, {
            dataType: 'text',
            method: 'GET'
          });
          if (res && res.data) {
            render = ejs.render(res.data, locals);
          }
          break;
        // 非开发环境(test、staging、prod): 从`/public/`读取
        default:
          layout = `${config.baseDir}/public/${pageName}.html`;
          if (Fs.existsSync(layout)) {
            render = ejs.render(Fs.readFileSync(layout, 'utf8'), locals);
            // 写入缓存
            renderCache[pageName] = render;
          }
      }
      if (render) {
        this.body = render;
      } else {
        this.status = 500;
        this.body = 'layout is not found';
      }
    }
  },
};
