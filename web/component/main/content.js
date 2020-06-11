import React from 'react';
import PropTypes from 'prop-types';

class Content extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    let className = 'catd-main-content mys-main-content';
    const propClassName = this.props.className;
    if (propClassName) {
      className += ' ' + propClassName;
    }
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default Content;
