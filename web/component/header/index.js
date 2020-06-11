/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { project, leftMenu } from './config';

export default class LayoutHeader extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: null
  };


  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: 'none'
    };
  }

  handleMouseOver = () => {
    this.setState({
      modalIsOpen: 'block',
    });
  }

  handleMouseOut = () => {
    this.setState({
      modalIsOpen: 'none',
    });
  }

  renderUser = user => (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className="mys-header-dropdown"
      onMouseOver={this.handleMouseOver}
      onMouseLeave={this.handleMouseOut}
    >
      <span><Avatar icon={<UserOutlined />} src={user.avatar} /></span>
      <div style={{ display: this.state.modalIsOpen }}>
        <span className="mys-header-dropdown-item">
          {/* <Icon type="user" /> */}
          <UserOutlined />
          {user.name}
        </span>
        <a className="mys-header-dropdown-item" href="/logout">
          {/* <Icon type="logout" /> */}
          <LogoutOutlined />
          退出
        </a>
      </div>
    </div>
  );

  render() {
    const { user } = this.props;

    return (
      <div className="mys-header">
        <div className="mys-header-left">
          <a href={project.home}>
            <i className={`iconfont ${project.logo}`} style={{ color: '#fff', fontSize: 28 }} />
            <h1>{project.title}</h1>
          </a>
        </div>
        <div className="mys-header-right">
          {this.renderUser(user || {})}
        </div>
        <div className="mys-header-left-menu">
          {
            leftMenu.map(({ title, link }) => (
              <a href={link} key={title} className="mys-header-menu-item">{title}</a>
            ))
          }
        </div>
      </div>
    );
  }
}
