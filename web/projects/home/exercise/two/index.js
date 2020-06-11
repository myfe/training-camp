/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, withRouter } from '@maoyan/tangdao';
import Main from '../../../../component/main/index';

import './index.less';

const { Title, Content } = Main;

class Exercise extends React.Component {
  static propTypes = {
    user: PropTypes.shape({})
  };

  static defaultProps = {
    user: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Title>评论组件</Title>
        <Content className="exercise-box">
          <h2>实现评论组件</h2>
          <h3>基本要求：</h3>
          <ul>
            <li>参考掘金文章的评论</li>
            <li>评论文章</li>
            <li>可以在别人评论里追加评论</li>
            <li>最好能够添加表情</li>
            <li>可以发挥自己想象添加新的炫酷的功能</li>
          </ul>
        </Content>
      </>
    );
  }
}

const PageExercise = withRouter(connect(
  state => ({
    user: state.user.toJS().user
  })
)(Exercise));

export default PageExercise;
