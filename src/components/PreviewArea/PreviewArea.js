import React, { Component } from 'react';
import { categories, decorations } from '../../lib/asset_config'

import './PreviewArea.css';

class PreviewArea extends Component {
  renderDecoration(category, decoration) {
    const categoryName = categories[category];
    const decorationName = decorations[categoryName][decoration];
    const path = `/assets/${categoryName}/${decorationName}.svg`;
    return <img src={path} />;
  }

  render() {
    const { props } = this;

    return (
      <div className="PreviewArea">
        <img src="assets/base_datamonster_tail_left.svg" />
        {props.decorations.map((decoration, category) => {
          return this.renderDecoration(category, decoration);
        })}
      </div>
    );
  }
}

export default PreviewArea;
