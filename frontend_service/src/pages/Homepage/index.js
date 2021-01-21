import React from 'react';

import './style.scss';
import { retailChainsMock } from '../../utils/constants';

import { BrandCard } from '../../components';

function Homepage() {
  return (
    <div className="main-content">
      <div className="cards-wrap">
        {retailChainsMock.map((brand) => (
          <BrandCard brandData={brand} key={brand.name} />
        ))}
      </div>
    </div>
  );
}

export default Homepage;
