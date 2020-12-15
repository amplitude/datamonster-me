import React, { Component } from 'react';

import { makeComposite } from '../../lib/image-processor'

import './PreviewArea.css';

class PreviewArea extends Component {

  async setSrcImage() {
    const { props } = this;
    props.setSrcImg(await makeComposite(props.decorations))
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
