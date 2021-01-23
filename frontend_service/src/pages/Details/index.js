import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import { ProductTable, PriceGraph, DetailsPageFilters } from '../../components';
import { links } from '../../utils/constants';

import './style.scss';
import { getProducts } from '../../utils/api';

function Details() {
  const { stores = [], category } = useLocation();
  const [firstStore] = stores;

  const [productsLoading, setProductsLoading] = useState(true);
  const [currentStoreId, setCurrentStoreId] = useState(firstStore?.id);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (currentStoreId) {
      setProductsLoading(true);
      (async () => {
        const { data } = await getProducts(currentStoreId, category);
        if (data.results?.length) {
          setTableData(data.results);
        }
        setProductsLoading(false);
      })();
    }
  }, [currentStoreId, category]);

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
          <Grid.Column largeScreen={3} widescreen={3}>
            <DetailsPageFilters className="details-page__filters" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Details;
