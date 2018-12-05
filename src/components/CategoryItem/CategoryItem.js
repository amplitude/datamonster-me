import React, { Component } from 'react';
import classNames from 'classnames';
import { decorations } from '../../lib/asset_config'

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

    const imgSrc = `assets/${props.name}/${decorations[props.name][0]}.png`;

    return (
      <div
        className={className}
        onClick={props.onClick}
      >
        <img className="preview-img" src={imgSrc} />
        <p className="category" >{capitalize(props.name)}</p>
      </div>
    );
  }
}

export default CategoryItem;
