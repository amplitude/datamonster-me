import React, { Component } from 'react';
import classNames from 'classnames';

import './DecorationItem.css';

class DecorationItem extends Component {
  render() {
    const { props } = this;

    const className = classNames({
      DecorationCircle: true,
      'selected': props.selected,
    });

    const imgSrc = `assets/${props.categoryName}/${props.name}_icon.png`;

    return (
      <div className="DecorationItem" >
        <div className={classNames({ DecorationBorder: props.border })} />
        <div
          className={className}
          onClick={props.onClick}
        >
          <img
            className="preview-img decoration"
            src={imgSrc}
            alt={props.name} />
        </div>
      </div>
    );
  }
}

export default DecorationItem;
