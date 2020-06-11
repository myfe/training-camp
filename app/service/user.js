const { Service } = require('egg');

class UserService extends Service {
  async getUser(id) {
    // TODO 获取user的逻辑
    const user = {
      id,
      name: '猫眼同学',
      avatar: 'http://p0.meituan.net/scarlett/e6e63a75fbd808b241147266ac05ee9612018.png'
    };
    return user;
  }
}

module.exports = UserService;
