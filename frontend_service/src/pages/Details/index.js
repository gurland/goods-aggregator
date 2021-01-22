import React from 'react';

import { Grid } from 'semantic-ui-react';
import { ProductTable, PriceGraph, DetailsPageFilters } from '../../components';

import './style.scss';

function Details() {
  return (
    <div className="details-page">
      <Grid centered className="details-page__grid">
        <Grid.Row columns={2}>
          <Grid.Column width={13}>
            <PriceGraph className="details-page__price-graph" />
            <ProductTable className="details-page__product-table" />
          </Grid.Column>
          <Grid.Column width={3}>
            <DetailsPageFilters className="details-page__filters" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Details;
