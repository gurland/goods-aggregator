import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import { ProductTable, PriceGraph, DetailsPageFilters, Sidebar } from '../../components';
import { links } from '../../utils/constants';
import { store, actions } from '../../utils/store';
import { getProducts, searchProducts } from '../../utils/api';
import { useWindowSize } from '../../utils/hooks';
import './style.scss';

const SHOW_SIDEBAR_WIDTH = 1200;

function Details() {
  const { stores = [], category } = useLocation();
  const [firstStore] = stores;
  const { state, dispatch } = useContext(store);

  const [productsLoading, setProductsLoading] = useState(true);
  const [currentStoreId, setCurrentStoreId] = useState(firstStore?.id);
  const [tableData, setTableData] = useState([]);

  const [width] = useWindowSize();

  useEffect(() => {
    if (currentStoreId) {
      setProductsLoading(true);
      (async () => {
        const { data, status } = category
          ? await getProducts(currentStoreId, category, state.selectedFilters, state.contentLanguage)
          : await searchProducts(state.selectedFilters, state.contentLanguage);
        if (!data || status !== 200) return;

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
  }, [currentStoreId, category, state.selectedFilters, dispatch, state.contentLanguage]);

  const graph = useMemo(() => <PriceGraph className="details-page__price-graph" />, []);

  const productTable = useMemo(
    () => (
      <ProductTable
        className="details-page__product-table"
        stores={stores}
        isLoading={productsLoading}
        tableData={tableData}
        currentStoreId={currentStoreId}
        setCurrentStoreId={setCurrentStoreId}
      />
    ),
    [stores, productsLoading, tableData, currentStoreId, setCurrentStoreId],
  );

  const detailsPageFilters = useMemo(
    () => (
      <DetailsPageFilters
        className="details-page__filters"
        filters={state.filters}
        selectedFilters={state.selectedFilters}
        isLoading={false} // TODO find a better solution to show preloader
      />
    ),
    [state.filters, state.selectedFilters],
  );

  if (!firstStore || !category) return <Redirect to={links.homepage} />;

  const createDetailsPage = (withSidebar = false) => (
    <div className={`details-page ${withSidebar ? 'with-sidebar' : ''}`}>
      <Grid centered className="details-page__grid">
        <Grid.Row columns={2}>
          <Grid.Column largeScreen={13} computer={16} widescreen={13} className="details-page__grid--left-column">
            {graph}
            {productTable}
          </Grid.Column>
          <Grid.Column largeScreen={3} widescreen={3} className="details-page__grid--right-column">
            {detailsPageFilters}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );

  return width <= SHOW_SIDEBAR_WIDTH ? <Sidebar>{createDetailsPage(true)}</Sidebar> : createDetailsPage();
}

export default Details;
