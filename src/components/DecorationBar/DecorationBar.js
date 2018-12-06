import React, { Component } from 'react';
import classNames from 'classnames';

import DecorationItem from '../DecorationItem/DecorationItem';
import { categories, decorations } from '../../lib/asset_config'

import './DecorationBar.css';

const DISPLAY_LENGTH = 6;

class DecorationBar extends Component {
  state = {
    position: 0,
  }

  goLeft() {
    const { state } = this;
    if (state.position > 0) {
      this.setState({position: state.position - 1});
    }
  }

  goRight() {
    const { props, state } = this;

    const decorationList = decorations[categories[props.categorySelected]]
    if (state.position < decorationList.length - DISPLAY_LENGTH) {
      this.setState({position: state.position + 1});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.categorySelected !== prevProps.categorySelected) {
      this.setState({position: 0});
    }
  }

  render() {
    const { props, state } = this;

    const decorationList = decorations[categories[props.categorySelected]]
    const displayList = decorationList.slice(state.position, state.position + DISPLAY_LENGTH);

    return (
      <div className="DecorationBar">
        <div
          className={classNames({chevron: true, hide: state.position === 0})}
          onClick={() => this.goLeft()}
        >
          ‹
        </div>
        {displayList.map((decoration, i) => {
          const decorationNum = i + state.position;

          return (
            <DecorationItem
              name={decoration}
              border={i !== 0}
              categoryName={categories[props.categorySelected]}
              selected={decorationNum === props.decorationSelected}
              onClick={() => props.updateDecoration(decorationNum)}
            />);
          })}
        <div
          className={classNames({chevron: true, hide: state.position >= decorationList.length - DISPLAY_LENGTH})}
          onClick={() => this.goRight()}
        >
          ›
        </div>
      </div>
    );
  }
}

export default DecorationBar;
