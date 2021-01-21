import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { retailChainsMock } from '../../utils/constants';

import { BrandCard } from '../../components';

function Homepage(props) {
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

Homepage.propTypes = {};

export default Homepage;
