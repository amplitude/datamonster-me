import React, { Component } from 'react';
import classNames from 'classnames';

import './CategoryItem.css';

class CategoryItem extends Component {
  render() {
    const { props } = this;

    const className = classNames({
      CategoryItem: true,
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

export default CategoryItem;
