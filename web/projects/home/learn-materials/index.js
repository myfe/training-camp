/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, withRouter } from '@maoyan/tangdao';
import Main from '../../../component/main/index';

import './index.less';

const { Title, Content } = Main;

class LearnMaterials extends React.Component {
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
        <Title>学习资料</Title>
        <Content>
          希望大家可以认真的看下我们准备的学习资料，然后可以选择习题来巩固下所学的知识。
        </Content>
      </>
    );
  }
}

const PageLearnMaterials = withRouter(connect(
  state => ({
    user: state.user.toJS().user
  })
)(LearnMaterials));

export default PageLearnMaterials;
