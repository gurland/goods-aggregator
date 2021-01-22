import React from 'react';
import PropTypes from 'prop-types';

import SuperTable from '../SuperTable';
import { productsTableData } from '../../utils/constants';
import { productsColumns } from './constants';

import { Card } from 'semantic-ui-react';
import './style.scss';

function ProductTable({ className }) {
  return (
    <Card fluid className={className}>
      <SuperTable columns={productsColumns} data={productsTableData} className="product-table-rows" />
    </Card>
  );
}

ProductTable.propTypes = {
  className: PropTypes.string,
};

ProductTable.defaultProps = {
  className: '',
};

export default ProductTable;
