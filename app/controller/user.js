const { Controller } = require('egg');

class UserController extends Controller {
  /**
   * 获取用户信息
   */
  async getUser() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser();
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: user
    };
  }
}

module.exports = UserController;
