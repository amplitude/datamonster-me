import React, { Component } from 'react';

import DecorationItem from '../DecorationItem/DecorationItem';
import { categories, decorations } from '../../lib/asset_config'

import './DecorationBar.css';

class DecorationBar extends Component {
  render() {
    const { props } = this;

    const decorationList = decorations[categories[props.categorySelected]]

    return (
      <ul className="DecorationBar">
        {decorationList.map((category, i) => (
          <DecorationItem
            name={category}
            selected={i === props.decorationSelected}
            onClick={() => props.updateDecoration(i)}
          />
        ))}
      </ul>
    );
  }
}

export default DecorationBar;
