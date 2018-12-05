import React, { Component } from 'react';

import DecorationItem from '../DecorationItem/DecorationItem';
import { categories, decorations } from '../../lib/asset_config'

import './DecorationBar.css';

class DecorationBar extends Component {
  render() {
    const { props } = this;

    const decorationList = decorations[categories[props.categorySelected]]

    return (
      <div className="DecorationBar">
        {decorationList.map((decoration, i) => (
          <DecorationItem
            name={decoration}
            border={i !== 0}
            categoryName={categories[props.categorySelected]}
            selected={i === props.decorationSelected}
            onClick={() => props.updateDecoration(i)}
          />
        ))}
      </div>
    );
  }
}

export default DecorationBar;
