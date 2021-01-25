import React, { useState, useEffect, useContext } from 'react';

import { store } from '../../utils/store';
import { retailChainsMock } from '../../utils/constants';
import { createDarkThemeClassName } from '../../utils/helpers';
import './style.scss';

import { Loader } from 'semantic-ui-react';
import { BrandCard, Navbar } from '../../components';

function Homepage() {
  const [retailChains, setRetailChains] = useState([]);
  const { state } = useContext(store);

  // TODO add content updating according to language change
  useEffect(() => {
    setTimeout(() => {
      setRetailChains(retailChainsMock);
    }, 500);
  }, []);

  return (
    <>
      <div className={createDarkThemeClassName('main-content', state.darkTheme)}>
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
