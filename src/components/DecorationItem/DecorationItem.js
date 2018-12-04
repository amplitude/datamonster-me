import React, { Component } from 'react';
import classNames from 'classnames';

import './DecorationItem.css';

class DecorationItem extends Component {
  render() {
    const { props } = this;

    const className = classNames({
      DecorationItem: true,
      'selected': props.selected,
    });

    return (
      <li
        className={className}
        onClick={props.update}
      >
        {props.name}
      </li>
    );
  }
}

export default DecorationItem;
