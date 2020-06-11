import tangdao, { loading } from '@maoyan/tangdao';
import { createBrowserHistory } from 'history';
import model from '../../model';

const history = createBrowserHistory();
// 第一步 创建应用实例
const app = tangdao({ history });

// 2. Plugins
app.use(loading());

// 第三步 注册 model
app.model(model);

// 第四步 注册 路由
app.router(require('./router').default);

// 启动应用
app.start('#app');
