import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import { ProductTable, PriceGraph, DetailsPageFilters, Sidebar } from '../../components';
import { links } from '../../utils/constants';
import { store, actions } from '../../utils/store';
import { getProducts, searchProducts } from '../../utils/api';
import { useWindowSize } from '../../utils/hooks';
import { createDarkThemeClassName } from '../../utils/helpers';
import './style.scss';

const SHOW_SIDEBAR_WIDTH = 1200;

function Details() {
  const { stores: storesFromCard = [], retailChain, category } = useLocation();
  const { state, dispatch } = useContext(store);

  const [productsLoading, setProductsLoading] = useState(true);
  const [storesLoading, setStoresLoading] = useState(true);

  const [currentStoreId, setCurrentStoreId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [stores, setStores] = useState(storesFromCard);

  const [width] = useWindowSize();

  useEffect(() => {
    if (retailChain) {
      setStoresLoading(true);

      (async () => {
        const { data, status } = await searchProducts({}, state.contentLanguage);
        if (status === 200 && data) {
          const currentRetailChain = data.find(({ name }) => name === retailChain);
          const [firstStore] = currentRetailChain.stores;

          if (!currentStoreId) setCurrentStoreId(firstStore.id);
          setStores(currentRetailChain.stores);

          setStoresLoading(false);
        }
      })();
    }
  }, [currentStoreId, retailChain, state.contentLanguage]);

  useEffect(() => {
    if (currentStoreId) {
      setProductsLoading(true);
      (async () => {
        const selectedFilters = { ...state.selectedFilters, sort: state.sortType };
        if (!category) selectedFilters.q = state.searchQuery;

        const { data, status } = await getProducts(currentStoreId, category, selectedFilters, state.contentLanguage);
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
  }, [
    currentStoreId,
    category,
    state.selectedFilters,
    dispatch,
    state.contentLanguage,
    state.searchQuery,
    state.sortType,
  ]);

  const graph = useMemo(() => <PriceGraph className="details-page__price-graph" showGraph={!!category} />, [category]);

  const productTable = useMemo(
    () => (
      <ProductTable
        className="details-page__product-table"
        stores={stores}
        isLoading={productsLoading || storesLoading}
        tableData={tableData}
        setCurrentStoreId={setCurrentStoreId}
      />
    ),
    [stores, productsLoading, storesLoading, tableData],
  );

  const detailsPageFilters = useMemo(
    () => (
      <DetailsPageFilters
        className="details-page__filters"
        filters={state.filters}
        selectedFilters={state.selectedFilters}
        isLoading={productsLoading}
      />
    ),
    [productsLoading, state.filters, state.selectedFilters],
  );

  if (!retailChain) return <Redirect to={links.homepage} />;

  const createDetailsPage = (withSidebar = false) => (
    <div
      className={createDarkThemeClassName(
        `details-page main-content ${withSidebar ? 'with-sidebar' : ''}`,
        state.darkTheme,
      )}
    >
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
