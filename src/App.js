import React, { Component } from 'react';

import ButtonBar from './components/ButtonBar/ButtonBar';
import CategoryBar from './components/CategoryBar/CategoryBar';
import DecorationBar from './components/DecorationBar/DecorationBar';
import PreviewArea from './components/PreviewArea/PreviewArea';
import TopBar from './components/TopBar/TopBar';

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
      srcImg: null,
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

  reset() {
    const numCategories = categories.length;
    let defaultDecorations = Array(numCategories);
    defaultDecorations.fill(0);

    this.setState({
      decorations: defaultDecorations,
    });
  }

  setSrcImg(img) {
    this.setState({srcImg: img});
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
        <TopBar />
        <ButtonBar
          randomize={() => this.randomize()}
          reset={() => this.reset()}
          srcImg={state.srcImg}
        />
        <PreviewArea
          decorations={state.decorations}
          setSrcImg={(img) => this.setSrcImg(img)}
          srcImg={state.srcImg}
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
