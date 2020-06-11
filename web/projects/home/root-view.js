import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect, withRouter, useModel } from '@maoyan/tangdao';
import { Layout } from 'antd';
import Sidebar from '../../component/sidebar/index.js';
import Header from '../../component/header/index.js';
import { project, sideNav } from './config';
import './root-view.less';

class LayoutContent extends React.Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    path: PropTypes.string.isRequired,
    Component: PropTypes.elementType.isRequired
  };

  constructor(props) {
    super(props);
    this.autoDispatch = useModel('user').autoDispatch;
    this.autoDispatch.fetchUser();
  }

  render() {
    const { user, Component, path } = this.props;
    return (
      <div className="mys mys-layout">
        <Header user={user} />
        <div className="mys-body layout-default">
          <Sidebar project={project} sideNav={sideNav} pathname={path} routerLink={Link} />
          <Layout className="layout-content mys-main">
            <Component />
          </Layout>
        </div>
      </div>
    );
  }
}


const LayoutView = withRouter(connect(
  state => ({
    user: state.user.toJS().user,
  })
)(LayoutContent));

export default LayoutView;
