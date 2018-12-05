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

    const imgSrc = `assets/${props.categoryName}/${props.name}.svg`;

    return (
      <div
        className={className}
        onClick={props.onClick}
      >
        <img className="preview-img" src={imgSrc} />
      </div>
    );
  }
}

export default DecorationItem;
