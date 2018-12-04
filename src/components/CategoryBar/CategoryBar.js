import React, { Component } from 'react';

import CategoryItem from '../CategoryItem/CategoryItem';
import { categories } from '../../lib/asset_config'

import './CategoryBar.css';

class CategoryBar extends Component {
  render() {
    const { props } = this;

    return (
      <ul className="CategoryBar">
        {categories.map((category, i) => (
          <CategoryItem
            name={category}
            selected={i === props.categorySelected}
            onClick={() => props.updateCategory(i)}
          />
        ))}
      </ul>
    );
  }
}

export default CategoryBar;
