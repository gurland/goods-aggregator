import React, { useState, useEffect, useContext } from 'react';

import { Loader } from 'semantic-ui-react';
import { BrandCard, Navbar } from '../../components';

import './style.scss';
import { searchProducts } from '../../utils/api';
import { store } from '../../utils/store';

function Homepage() {
  const [retailChains, setRetailChains] = useState([]);
  const { state } = useContext(store);

  useEffect(() => {
    (async () => {
      const { data, status } = await searchProducts({}, state.contentLanguage);
      if (data?.length && status === 200) {
        setRetailChains(data);
      }
    })();
  }, [state.contentLanguage]);

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
