import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import clipboard from 'clipboard-polyfill';

class Title extends React.PureComponent {
  static propTypes = {
    copytext: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    copytext: '',
    description: '',
  };

  copy = () => {
    clipboard.writeText(this.props.copytext);
    message.success('复制成功');
  };

  render() {
    const { children, copytext, description } = this.props;
    return (
      <div className="catd-main-title mys-main-title">
        <div className="mys-h3">
          {children}
          {copytext && <i onClick={this.copy} className="iconfont icon-copy" title="复制" />}
        </div>
        {description && <div className="mys-sub-s">{description}</div>}
      </div>
    );
  }
}

export default Title;
