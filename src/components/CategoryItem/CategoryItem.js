import React, { Component } from 'react';
import classNames from 'classnames';

import './CategoryItem.css';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class CategoryItem extends Component {
  render() {
    const { props } = this;
    const className = classNames({
      CategoryItem: true,
      'selected': props.selected,
    });

    const imgSrc = `assets/${props.name}/icon.png`;

    return (
      <div
        className={className}
        onClick={props.onClick}
      >
        <img className="preview-img" src={imgSrc} alt={ props.name }/>
        <p className="category" >{capitalize(props.name)}</p>
      </div>
    );
  }
}

export default CategoryItem;
