import React, { useState, useEffect, useContext } from 'react';

import { Loader } from 'semantic-ui-react';
import { BrandCard, Navbar } from '../../components';

import './style.scss';
import { searchProducts } from '../../utils/api';
import { store } from '../../utils/store';

function Homepage() {
  const [retailChains, setRetailChains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useContext(store);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data, status } = await searchProducts({}, state.contentLanguage);
      if (data?.length && status === 200) {
        setRetailChains(data);
        setIsLoading(false);
      }
    })();
  }, [state.contentLanguage]);

  return (
    <>
      <div className="main-content">
        <div className="cards-wrap">
          {isLoading ? (
            <Loader active inline="centered" />
          ) : (
            retailChains.map((brand) => <BrandCard brandData={brand} key={brand.name} />)
          )}
        </div>
      </div>
      <Navbar position={'bottom'} />
    </>
  );
}

export default Homepage;
