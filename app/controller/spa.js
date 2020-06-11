const { Controller } = require('egg');

class HomeController extends Controller {
  async home() {
    const { ctx } = this;
    await ctx.renderPage('home', {
      url: ctx.url,
      title: '主页',
      keywords: 'React,egg',
      description: '主页'
    });
  }
}

module.exports = HomeController;
