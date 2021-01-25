import React, { useEffect, useContext } from 'react';

import { Loader } from 'semantic-ui-react';
import { BrandCard, Navbar } from '../../components';

import './style.scss';
import { searchProducts } from '../../utils/api';
import { store, actions } from '../../utils/store';

function Homepage() {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: actions.SET_HOMEPAGE_LOADING, payload: true });
    (async () => {
      const { data, status } = await searchProducts({ q: state.searchQuery }, state.contentLanguage);
      if (data?.length && status === 200) {
        dispatch({ type: actions.SAVE_RETAIL_CHAINS, payload: data });
        dispatch({ type: actions.SET_HOMEPAGE_LOADING, payload: false });
      }
    })();
  }, [dispatch, state.contentLanguage, state.searchQuery]);

  return (
    <>
      <div className="main-content">
        <div className="cards-wrap">
          {state.homepageLoading ? (
            <Loader active inline="centered" />
          ) : (
            state.retailChains.map((brand) => <BrandCard brandData={brand} key={brand.name} />)
          )}
        </div>
      </div>
      <Navbar position={'bottom'} />
    </>
  );
}

export default Homepage;
