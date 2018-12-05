import React, { Component } from 'react';
import mergeImages from 'merge-images';

import { categories, decorations } from '../../lib/asset_config'
import ButtonBar from '../ButtonBar/ButtonBar';

import './PreviewArea.css';

class PreviewArea extends Component {
  state = {
    srcImage: null,
  }

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
        <ButtonBar
          randomize={props.randomize}
          reset={props.reset}
          srcImage={state.srcImage}
        />
        <img className="preview-image" src={state.srcImage} />
      </div>
    );
  }
}

export default PreviewArea;
