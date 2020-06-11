module.exports = app => {
  app.redirect('/', '/trainingcamp', 302);
  app.redirect('/home', '/trainingcamp', 302);
  // 获取home页面
  app.get('/trainingcamp(/.+)?', app.controller.spa.home);
  // 获取用户信息(接口)
  app.get('/api/user', app.controller.user.getUser);
};
