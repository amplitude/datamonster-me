import React, { Component } from 'react';

import ButtonBar from './components/ButtonBar/ButtonBar';
import CategoryBar from './components/CategoryBar/CategoryBar';
import DecorationBar from './components/DecorationBar/DecorationBar';
import PreviewArea from './components/PreviewArea/PreviewArea';
import TopBar from './components/TopBar/TopBar';

import {
  categories,
  decorations,
  mutuallyExclusiveDecorations
} from './lib/asset-config';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const decorations = this.makeEmptyDecorationsArray()

    this.state = {
      srcImg: null,
      categorySelected: 0,
      decorations,
      history: [ decorations ],
      historyIndex: 0,
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
    this.addHistoryState(
      this.makeEmptyDecorationsArray().map(function(val, i) {
        const numDecorations = decorations[categories[i]].length
        return [Math.floor(Math.random() * numDecorations)]
      }),
    )
  }

  reset() {
    this.addHistoryState(this.makeEmptyDecorationsArray());
  }

  setSrcImg(img) {
    this.setState({srcImg: img});
  }

  // A decoration cateogry supports multi select if there is more than one
  // level of depth.
  categorySupportsMultiSelect(categoryIndex) {
    return !!Object.values(decorations)[categoryIndex].find(decoration => {
      return Array.isArray(decoration)
    })
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

      // Deselect sibling choices
      const siblings = mutuallyExclusiveDecorations[categoryIndex][choice]
      choices = choices.filter(selection => !siblings.includes(selection))

      // Add the choice to the list of choices
      return [ ...choices, choice ]
    })

    this.addHistoryState(decorations)
  }

  addHistoryState(decorations) {
    const { state } = this,
      newIndex = state.historyIndex + 1
    this.setState({
      decorations,
      history: state.history.slice(0, newIndex).concat([ decorations ]),
      historyIndex: newIndex,
    });
  }

  undo() {
    this.gotoHistoryIndex(this.state.historyIndex - 1)
  }

  redo() {
    this.gotoHistoryIndex(this.state.historyIndex + 1)
  }

  gotoHistoryIndex(index) {
    this.setState({
      decorations: this.state.history[index],
      historyIndex: index,
    })
  }

  render() {
    const { state } = this;

    // Determine whether to show undo and redo
    const hasUndo = state.historyIndex > 0,
      hasRedo = state.historyIndex < state.history.length - 1

    return (
      <div className="App">
        <TopBar />
        <ButtonBar
          undo={() => this.undo()}
          hasUndo={hasUndo}
          redo={() => this.redo()}
          hasRedo={hasRedo}
          randomize={() => this.randomize()}
          reset={() => this.reset() }
          choices={state.decorations }
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
