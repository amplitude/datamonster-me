import React, { Component } from 'react';
import mergeImages from 'merge-images';

import { categories, decorations } from '../../lib/asset_config'

import './PreviewArea.css';

class PreviewArea extends Component {
  setSrcImage() {
    const { props } = this;

    const base_image = ['assets/base_datamonster_tail_left.png']
    const decoration_images = props.decorations.map((decoration, category) => {
      const categoryName = categories[category];
      const decorationName = decorations[categoryName][decoration];
      return `assets/${categoryName}/${decorationName}.png`
    });

    const images = base_image.concat(decoration_images);

    mergeImages(images)
      .then(src => {
        props.setSrcImg(src);
      });
  }

  componentDidMount() {
    this.setSrcImage();
  }

  componentDidUpdate() {
    this.setSrcImage();
  }

  render() {
    const { props } = this;

    return (
      <div className="PreviewArea">
        <img className="preview-image" src={props.srcImg} />
      </div>
    );
  }
}

export default PreviewArea;
