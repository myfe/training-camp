import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

const { SubMenu } = Menu;

class SideNav extends React.PureComponent {
  static propTypes = {
    sideNav: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    routerLink: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  state = {
    openKeys: [],
    selectedKeys: [],
  };

  componentDidMount() {
    this.setKeys(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setKeys(nextProps);
  }

  onOpenChange = openKeys => {
    this.setState({ openKeys });
  };

  setKeys = props => {
    const { sideNav, pathname } = props;
    let selectedKey;
    for (let i = 0, nav; i < sideNav.length; i++) {
      nav = sideNav[i];
      if (nav.link === pathname) {
        selectedKey = nav.key;
        break;
      }
      if (nav.children) {
        const subMenu = nav.children.find(item => item.link === pathname);
        if (subMenu) {
          selectedKey = subMenu.key;
          break;
        }
      }
    }
    // 如果没有完全匹配的，则找模糊匹配的
    if (!selectedKey) {
      for (let i = 0, nav; i < sideNav.length; i++) {
        nav = sideNav[i];
        if (pathname.startsWith(nav.link)) {
          selectedKey = nav.key;
          break;
        }
        if (nav.children) {
          /* const subMenu = nav.children.find(item => pathname.startsWith(item.link));
          if (subMenu) {
            selectedKey = subMenu.key;
            break;
          } */
          // 要寻找最长匹配
          let maxLen = 0;
          // eslint-disable-next-line no-loop-func
          nav.children.forEach(item => {
            if (pathname.startsWith(item.link) && item.link.length > maxLen) {
              selectedKey = item.key;
              maxLen = item.link.length;
            }
          });
          if (selectedKey) {
            break;
          }
        }
      }
    }

    const keys = {
      selectedKeys: selectedKey ? [selectedKey] : [],
    };
    if (props.pathname === this.props.pathname) { // 说明变的是sideNav数据
      keys.openKeys = props.sideNav.map(item => item.key);
    }
    this.setState(keys);
  };

  renderSubMenu = item => {
    const Link = this.props.routerLink;
    return (
      <SubMenu
        key={item.key}
        title={
          <span>
            <i className={`iconfont ${item.icon}`} />
            <span>
              {item.link ? <Link to={item.link} href={item.link}>{item.title}</Link> : item.title}
            </span>
          </span>
        }
      >
        {
          item.children.map(({ title, link, key }) => (
            <Menu.Item key={key}>
              <Link to={link} href={link}>{title}</Link>
            </Menu.Item>
          ))
        }
      </SubMenu>
    );
  };

  renderItem = item => {
    const Link = this.props.routerLink;
    return (
      <Menu.Item key={item.key}>
        <Link to={item.link} href={item.link}>
          <i className={`iconfont ${item.icon}`} />
          <span>{item.title}</span>
        </Link>
      </Menu.Item>
    );
  };

  render() {
    const { sideNav } = this.props;
    const { openKeys, selectedKeys } = this.state;
    return (
      <div className="mys-side-nav">
        <Menu
          // onClick={this.onOpenChange}
          onOpenChange={this.onOpenChange}
          // defaultOpenKeys={defaultOpen}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          mode="inline"
          inlineIndent="20"
        >
          {
            sideNav.map(item => (
              item.children && item.children.length ? this.renderSubMenu(item) : this.renderItem(item)
            ))
          }
        </Menu>
      </div>
    );
  }
}

export default SideNav;
