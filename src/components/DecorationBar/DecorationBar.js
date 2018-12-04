import React, { Component } from 'react';

import DecorationItem from '../DecorationItem/DecorationItem';
import { categories, decorations } from '../../lib/asset_config'

import './DecorationBar.css';

class DecorationBar extends Component {
  render() {
    const { props } = this;

    const decorationList = decorations[categories[props.category]]

    return (
      <ul className="DecorationBar">
        {decorationList.map((category, i) => (
          <DecorationItem
            name={category}
            selected={false}
            update={() => props.update(i)}
          />
        ))}
      </ul>
    );
  }
}

export default DecorationBar;
