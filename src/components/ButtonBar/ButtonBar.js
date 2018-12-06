import React, { Component } from 'react';

import './ButtonBar.css';

class ButtonBar extends Component {
  render() {
    const { props } = this;

    return (
      <div className="ButtonBar">
        <a onClick={props.reset}><p>CLEAR</p></a>
        <a onClick={props.randomize}><p>RANDOMIZE</p></a>
        <div style={{flex: 1}} />
        <a className="finish" href={props.srcImg} download><p>DOWNLOAD</p></a>
      </div>
    );
  }
}

export default ButtonBar;
