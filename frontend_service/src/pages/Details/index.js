import React from 'react';

import { ProductTable } from '../../components';

function Details() {
  return (
    <div className="details-page">
      <div className="details-page__wrapper">
        <div className="graph" /> {/* <-- Рома, в'єби тут графік */}
        <ProductTable />
      </div>
    </div>
  );
}

export default Details;
