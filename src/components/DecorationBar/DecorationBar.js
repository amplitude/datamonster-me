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

    let destination = state.position - DISPLAY_LENGTH;
    if (destination < 0) {
      destination = 0;
    }

    this.setState({position: destination});
  }

  goRight() {
    const { props, state } = this;

    const decorationList = decorations[categories[props.categorySelected]];

    let destination = state.position + DISPLAY_LENGTH;
    if (destination > decorationList.length - DISPLAY_LENGTH) {
      destination = decorationList.length - DISPLAY_LENGTH;
    }

    this.setState({position: destination});
  }

  componentDidUpdate(prevProps) {
    if (this.props.categorySelected !== prevProps.categorySelected) {
      this.setState({position: 0});
    }
  }

  // Determine if a decoration item should be marked as selected
  isSelected(decorationNum) {
    const { props } = this;
    if (Array.isArray(props.decorationSelected)) {
      return props.decorationSelected.includes(decorationNum)
    } else return decorationNum === props.decorationSelected
  }

  render() {
    const { props, state } = this;

    const decorationList = decorations[categories[props.categorySelected]].flat()

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
              key={decoration}
              name={decoration}
              border={i !== 0}
              categoryName={categories[props.categorySelected]}
              selected={this.isSelected(decorationNum)}
              onClick={() => props.updateDecoration(decorationNum)}
            />);
          })}
        <div
          className={classNames({
            chevron: true,
            hide: state.position >= decorationList.length - DISPLAY_LENGTH,
          })}
          onClick={() => this.goRight()}
        >
          ›
        </div>
      </div>
    );
  }
}

export default DecorationBar;
