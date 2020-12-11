import React, { Component } from 'react';
import mergeImages from 'merge-images';

import { categories, decorations } from '../../lib/asset_config'

import './PreviewArea.css';

class PreviewArea extends Component {
  setSrcImage() {
    const { props } = this;

    const baseImage = ['assets/base_datamonster_tail_left.png']

    // Build a list of the paths to all selected images
    const decorationImages = props.decorations
    .reduce((images, selections, categoryIndex) => {
      selections.forEach(selectionIndex => {
        const categoryName = categories[categoryIndex];
        const decorationName = decorations[categoryName][selectionIndex];
        images.push(`assets/${categoryName}/${decorationName}.png`)
      })
      return images
    }, [])

    const images = baseImage.concat(decorationImages);

    mergeImages(images)
      .then(src => {
        props.setSrcImg(src);
      });
  }

  componentDidMount() {
    this.setSrcImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.decorations !== this.props.decorations) {
      this.setSrcImage();
    }
  }

  render() {
    const { props } = this;

    return (
      <div className="PreviewArea">
        {props.srcImg && <img
          className="preview-image"
          src={props.srcImg}
          alt='Datamonster preview' />
        }
      </div>
    );
  }
}

export default PreviewArea;
