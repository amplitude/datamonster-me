import React, { Component } from 'react';

import CategoryBar from './components/CategoryBar/CategoryBar';
import DecorationBar from './components/DecorationBar/DecorationBar';
import PreviewArea from './components/PreviewArea/PreviewArea';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorySelected: 0,
      decorations: [0, 0],
    }
  }

  updateCategory(category) {
    this.setState({
      categorySelected: category,
    });
  }

  updateDecoration(decoration) {
    const { state } = this;

    const decorations = state.decorations.map((elem, i) => {
      return i === state.categorySelected ? decoration : elem;
    })

    this.setState({ decorations });
  }

  render() {
    const { state } = this;

    return (
      <div className="App">
        <PreviewArea decorations={state.decorations} />
        <DecorationBar
          category={state.categorySelected}
          update={(decoration) => this.updateDecoration(decoration)}
        />
        <CategoryBar
          category={state.categorySelected}
          update={(category) => this.updateCategory(category)}
        />
      </div>
    );
  }
}

export default App;
