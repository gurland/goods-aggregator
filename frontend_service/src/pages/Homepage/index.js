import React, { useState, useEffect } from 'react';

import './style.scss';
import { retailChainsMock } from '../../utils/constants';

import { Loader } from 'semantic-ui-react';
import { BrandCard, Navbar } from '../../components';

function Homepage() {
  const [retailChains, setRetailChains] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setRetailChains(retailChainsMock);
    }, 500);
  }, []);

  return (
    <>
      <div className="main-content">
        <div className="cards-wrap">
          {retailChains.map((brand) => (
            <BrandCard brandData={brand} key={brand.name} />
          ))}
          {!retailChains.length && <Loader active inline="centered" />}
        </div>
      </div>
      <Navbar position={'bottom'} />
    </>
  );
}

export default Homepage;
