import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import SideNav from './side-nav';

import './style/index.less';

class Sidebar extends React.PureComponent {
  static propTypes = {
    project: PropTypes.shape({}).isRequired,
    sideNav: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    routerLink: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  close = () => {
    const { sidebar } = this;
    sidebar.style.width = '50px';
    setTimeout(() => {
      sidebar.children[0].setAttribute('hidden', true);
      sidebar.children[1].removeAttribute('hidden');
    }, 250);
  };

  open = () => {
    const { sidebar } = this;
    sidebar.children[0].removeAttribute('hidden');
    sidebar.children[1].setAttribute('hidden', true);
    sidebar.style.width = '200px';
  };

  saveRef = sidebar => {
    this.sidebar = sidebar;
  };

  renderPopoverMenu = item => {
    const Link = this.props.routerLink;
    let { title } = item;
    let content;
    if (item.children && item.children.length) {
      content = (
        <div>
          {item.children.map(subItem => (
            <Link key={subItem.key} to={subItem.link} href={subItem.link}>
              {subItem.title}
            </Link>
          ))}
        </div>
      );
    } else {
      const { link } = item;
      content = link ? <Link to={link} href={link}>{title}</Link> : title;
      title = '';
    }
    return (
      <Popover
        placement="rightTop"
        overlayClassName="mys-sidebar-popover-menu"
        key={item.title}
        title={title}
        content={content}
        arrowPointAtCenter
      >
        <i className={`iconfont ${item.icon}`} />
      </Popover>
    );
  };

  renderHomeLink = (project, homeLink) => {
    const Link = this.props.routerLink;
    return (
      <Popover
        placement="rightTop"
        overlayClassName="mys-sidebar-popover-menu"
        content={<Link to={homeLink} href={homeLink}>{project.subTitle}</Link>}
        arrowPointAtCenter
      >
        <i className={`iconfont ${project.subIcon}`} />
      </Popover>
    );
  };

  render() {
    const Link = this.props.routerLink;
    const { project, sideNav, pathname } = this.props;
    const homeLink = project.home || `/${project.key}`;

    return (
      <div className="mys-sidebar" ref={this.saveRef}>
        <div className="mys-sidebar-open">
          {project.subTitle &&
            <div className="mys-sidebar-header">
              <Link to={homeLink} href={homeLink}>
                <div className="mys-h3">{project.subTitle}</div>
              </Link>
            </div>
          }
          <SideNav sideNav={sideNav} routerLink={Link} pathname={pathname} />
          <div className="mys-sidebar-footer">
            <button className="mys-proxy-button" onClick={this.close} title="收起菜单">
              <i className="iconfont icon-outdent" />
            </button>
          </div>
        </div>
        <div className="mys-sidebar-closed" hidden>
          <div className="mys-sidebar-header">
            {project.subIcon && this.renderHomeLink(project, homeLink)}
            {sideNav.map(item => this.renderPopoverMenu(item))}
          </div>
          <div className="mys-sidebar-footer">
            <button className="mys-proxy-button" onClick={this.open} title="展开菜单">
              <i className="iconfont icon-indent" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
