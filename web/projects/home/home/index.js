import React from 'react';
import PropTypes from 'prop-types';
import { connect, withRouter } from '@maoyan/tangdao';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.less';

class IndexPage extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
  }

  render() {
    const { user } = this.props;
    return (
      <div className="HomePage">
        <div className="user-info">
          <div className="avatar">
            {user && <Avatar icon={<UserOutlined />} src={user.avatar} size={64} />}
          </div>
          <div className="name">
            <h1>{user.name}</h1>
            <p>{user.username}</p>
          </div>
        </div>
        <div>
          欢迎加入猫眼前端大家庭，吧啦吧啦吧啦吧啦······
        </div>
      </div>
    );
  }
}

const PageHome = withRouter(connect(
  state => ({
    user: state.user.toJS().user,
  })
)(IndexPage));

export default PageHome;
