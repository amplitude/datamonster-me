import React, { Component } from 'react';

import CategoryItem from '../CategoryItem/CategoryItem';
import { categories } from '../../lib/asset-config'

import './CategoryBar.css';

class CategoryBar extends Component {
  render() {
    const { props } = this;

    return (
      <div className="CategoryBar">
        {categories.map((category, i) => (
          <CategoryItem
            key={category}
            name={category}
            selected={i === props.categorySelected}
            onClick={() => props.updateCategory(i)}
          />
        ))}
      </div>
    );
  }
}

export default CategoryBar;
