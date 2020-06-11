import React from 'react';
import { Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import './index.less';

function NotFound() {
  return (
    <div className="notFound">
      <h1>404 -  Not Found</h1>
      <Card>
        <p>您当前访问的页面不存在</p>
        <p>
          <ArrowLeftOutlined />
          <a href="/home">返回首页</a>
        </p>
      </Card>
    </div>
  );
}

export default NotFound;
