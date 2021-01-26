import React, { useContext } from 'react';
import { Radio, Header } from 'semantic-ui-react';

import './style.scss';
import { store, actions } from '../../utils/store';

function SortSlider() {
  const { dispatch } = useContext(store);

  const setSortingType = (event, { checked }) =>
    dispatch({ type: actions.SET_SORTING_TYPE, payload: checked ? 'price_desc' : 'price_asc' });

  return (
    <>
      <Header id="sort-slider-header">Sort by price</Header>
      <div className="sort-slider--wrapper">
        <span className="sort-slider--asc">asc</span>
        <Radio toggle className="sort-slider--toggle" onChange={setSortingType} />
        <span className="sort-slider--desc">desc</span>
      </div>
    </>
  );
}

export default SortSlider;
