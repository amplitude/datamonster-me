import React, { Component } from 'react';

import CategoryBar from './components/CategoryBar/CategoryBar';
import DecorationBar from './components/DecorationBar/DecorationBar';
import PreviewArea from './components/PreviewArea/PreviewArea';

import { categories, decorations } from './lib/asset_config'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const numCategories = categories.length;
    let defaultDecorations = Array(numCategories);
    defaultDecorations.fill(0);

    this.state = {
      categorySelected: 0,
      decorations: defaultDecorations,
    }
  }

  updateCategory(category) {
    this.setState({
      categorySelected: category,
    });
  }

  randomize() {
    const numCategories = categories.length;
    let randomDecorations = Array(numCategories);
    randomDecorations.fill(0);
    for (let i = 0; i < categories.length; i++) {
      const numDecorations = decorations[categories[i]].length;
      randomDecorations[i] = Math.floor(Math.random() * numDecorations);
    }

    this.setState({
      decorations: randomDecorations,
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
        <PreviewArea
          decorations={state.decorations}
          randomize={() => this.randomize()}
        />
        <DecorationBar
          decorationSelected={state.decorations[state.categorySelected]}
          categorySelected={state.categorySelected}
          updateDecoration={(decoration) => this.updateDecoration(decoration)}
        />
        <CategoryBar
          categorySelected={state.categorySelected}
          updateCategory={(category) => this.updateCategory(category)}
        />
      </div>
    );
  }
}

export default App;
