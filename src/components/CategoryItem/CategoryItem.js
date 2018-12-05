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

    const imgSrc = `assets/${props.name}/${props.name}_default.svg`;

    return (
      <div
        className={className}
        onClick={props.onClick}
      >
        <img className="preview-img" src={imgSrc} />
        <p>{props.name}</p>
      </div>
    );
  }
}

export default CategoryItem;
