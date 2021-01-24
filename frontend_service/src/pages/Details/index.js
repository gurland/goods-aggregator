import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import { ProductTable, PriceGraph, DetailsPageFilters } from '../../components';
import { links } from '../../utils/constants';
import { store, actions } from '../../utils/store';
import { getProducts } from '../../utils/api';
import './style.scss';

function Details() {
  const { stores = [], category } = useLocation();
  const [firstStore] = stores;
  const { state, dispatch } = useContext(store);

  const [productsLoading, setProductsLoading] = useState(true);
  const [currentStoreId, setCurrentStoreId] = useState(firstStore?.id);
  const [tableData, setTableData] = useState([]);

  const setSelectedFilters = (newFilters) => dispatch({ type: actions.SELECT_FILTERS, payload: newFilters });

  useEffect(() => {
    if (currentStoreId) {
      setProductsLoading(true);
      (async () => {
        const { data } = await getProducts(currentStoreId, category, state.selectedFilters);
        const { results, filters } = data;
        if (results?.length) {
          setTableData(results);
        }

        if (filters?.length) {
          dispatch({ type: actions.SAVE_FETCHED_FILTERS, payload: filters });
        }

        setProductsLoading(false);
      })();
    }
  }, [currentStoreId, category, state.selectedFilters, dispatch]);

  if (!firstStore || !category) return <Redirect to={links.homepage} />;

  return (
    <div className="details-page">
      <Grid centered className="details-page__grid">
        <Grid.Row columns={2}>
          <Grid.Column largeScreen={13} computer={16} widescreen={13} className="details-page__grid--left-column">
            <PriceGraph className="details-page__price-graph" />
            <ProductTable
              className="details-page__product-table"
              stores={stores}
              isLoading={productsLoading}
              tableData={tableData}
              currentStoreId={currentStoreId}
              setCurrentStoreId={setCurrentStoreId}
            />
          </Grid.Column>
          <Grid.Column largeScreen={3} widescreen={3} className="details-page__grid--right-column">
            <DetailsPageFilters
              className="details-page__filters"
              filters={state.filters}
              selectedFilters={state.selectedFilters}
              setSelectedFilters={setSelectedFilters}
              isLoading={false} // TODO find a better solution to show preloader
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Details;
