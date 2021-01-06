import React, { Component } from 'react';
import Share from './Share'

import './ButtonBar.css';

class ButtonBar extends Component {
  render() {
    const { props } = this;

    return (
      <div className="ButtonBar">
        { props.hasUndo && (<a onClick={props.undo}><p>UNDO</p></a>)}
        { props.hasRedo && (<a onClick={props.redo}><p>REDO</p></a>)}
        <a onClick={props.reset}><p>CLEAR</p></a>
        <a onClick={props.randomize}><p>RANDOMIZE</p></a>
        <div style={{flex: 1}} />
        <Share choices={props.choices} />
        <a className="finish" href={props.srcImg} download><p>DOWNLOAD</p></a>
      </div>
    );
  }
}

export default ButtonBar;
