import React from 'react';
import PropTypes from 'prop-types';

import SuperTable from '../SuperTable';
import { productsTableData } from '../../utils/constants';
import { productsColumns } from './constants';

function ProductTable(props) {
  return <SuperTable columns={productsColumns} data={productsTableData} />;
}

ProductTable.propTypes = {};

export default ProductTable;
