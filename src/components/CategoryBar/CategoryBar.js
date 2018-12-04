import React, { Component } from 'react';

import CategoryItem from '../CategoryItem/CategoryItem';

import './CategoryBar.css';

class CategoryBar extends Component {
  render() {
    return (
      <ul className="CategoryBar">
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </ul>
    );
  }
}

export default CategoryBar;
