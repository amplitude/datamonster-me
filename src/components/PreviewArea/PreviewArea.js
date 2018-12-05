import React, { Component } from 'react';
import mergeImages from 'merge-images';

import { categories, decorations } from '../../lib/asset_config'

import './PreviewArea.css';

class PreviewArea extends Component {
  state = {
    srcImage: null,
  }

  setSrcImage() {
    const { props } = this;

    const base_image = ['assets/base_datamonster_tail_left.svg']
    const decoration_images = props.decorations.map((decoration, category) => {
      const categoryName = categories[category];
      const decorationName = decorations[categoryName][decoration];
      return `assets/${categoryName}/${decorationName}.svg`
    });

    const images = base_image.concat(decoration_images);

    mergeImages(images, {format: 'image/svg+xml'})
      .then(src => {
        this.setState({srcImage: src});
      });
  }

  componentDidMount() {
    this.setSrcImage();
  }

  componentDidUpdate() {
    this.setSrcImage();
  }

  render() {
    const { props, state } = this;

    return (
      <div className="PreviewArea">
        <img className="preview-image" src={state.srcImage} />
        <a onClick={props.randomize}>RANDOM</a>
        <br />
        <a onClick={props.reset}>CLEAR</a>
        <br />
        <a href={state.srcImage} download>DOWNLOAD</a>
      </div>
    );
  }
}

export default PreviewArea;
