import React from 'react';
import PropTypes from 'prop-types';
import { connect, withRouter } from '@maoyan/tangdao';
import Main from '../../../../component/main/index';

import './index.less';

const { Title, Content } = Main;

class ExerciseOne extends React.Component {
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
        <Title>图片拖拽上传</Title>
        <Content className="exercise-box">
          <h2>实现图片拖拽上传功能组件</h2>
          <h3>基本要求：</h3>
          <ul>
            <li>可以将图片拖拽到页面里，显示小图片、名称、尺寸和大小</li>
            <li>可以上传多张图片</li>
            <li>点击图片可以进入预览模式，实现左右翻页查看不同的图片</li>
            <li>点击上传将图片传到后台</li>
            <li>后台将图片放到一个指定的文件夹</li>
            <li>可以添加自己的想法去实现更好的操作</li>
          </ul>
        </Content>
      </>
    );
  }
}

const PageExerciseOne = withRouter(connect(
  state => ({
    user: state.user.toJS().user
  })
)(ExerciseOne));

export default PageExerciseOne;
