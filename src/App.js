import React, { Component } from 'react';

import ButtonBar from './components/ButtonBar/ButtonBar';
import CategoryBar from './components/CategoryBar/CategoryBar';
import DecorationBar from './components/DecorationBar/DecorationBar';
import PreviewArea from './components/PreviewArea/PreviewArea';
import TopBar from './components/TopBar/TopBar';

import { categories, decorations, multiSelectCategories } from './lib/asset_config';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);



    this.state = {
      categorySelected: 0,
      decorations: this.makeEmptyDecorationsArray(),
      srcImg: null,
    }
  }

  makeEmptyDecorationsArray() {
    const numCategories = categories.length;
    let defaultDecorations = Array(numCategories);
    defaultDecorations.fill([ 0 ]);
    return defaultDecorations
  }

  updateCategory(category) {
    this.setState({
      categorySelected: category,
    });
  }

  randomize() {
    this.setState({
      decorations: this.makeEmptyDecorationsArray().map(function(val, i) {
        const numDecorations = decorations[categories[i]].length
        return [Math.floor(Math.random() * numDecorations)]
      }),
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

  categorySupportsMultiSelect(index) {
    return multiSelectCategories.includes(Object.keys(decorations)[index])
  }

  updateDecoration(choice) {
    const { state } = this;

    // Loop thrrough the selections of a decoration category
    const decorations = state.decorations.map((selections, categoryIndex) => {

      // If not the active cateogry, don't change
      if (categoryIndex !== state.categorySelected) {
        return selections
      }

      // If the category doesn't support multiselect, set the value directly
      if (!this.categorySupportsMultiSelect(categoryIndex)) {
        return [ choice ]
      }

      // Is a multiselect category and the clear button clicked, select only
      // the clear icon. Otherwise, make sure the clear button is removed
      let choices = selections
      if (choice == 0) {
        return [ 0 ]
      } else {
        choices = choices.filter(selection => selection !== 0)
      }

      // If this decoration is already selected, remove it
      if (choices.includes(choice)) {
        choices = choices.filter(selection => selection != choice)
        if (choices.length == 0) return [ 0 ] // Choose clear icon
        return choices
      }

      // Else, add the choice to the list of choices
      return [ ...choices, choice ]
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
