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

    const imgSrc = `assets/${props.categoryName}/${props.name}.png`;

    return (
      <div className="DecorationItem" >
        <div className={classNames({ DecorationBorder: props.border })} />
        <div
          className={className}
          onClick={props.onClick}
        >
          <img className="preview-img" src={imgSrc} />
        </div>
      </div>
    );
  }
}

export default DecorationItem;
