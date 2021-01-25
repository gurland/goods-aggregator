import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Tab } from 'semantic-ui-react';

import SuperTable from '../SuperTable';
import { productsColumns } from './constants';
import { getAddress } from '../../utils/helpers';
import './style.scss';

function ProductTable({ className, stores, isLoading, tableData, currentStoreId, setCurrentStoreId }) {
  const handleTabChange = useCallback((event, { activeIndex, panes }) => setCurrentStoreId(panes[activeIndex].id), [
    setCurrentStoreId,
  ]);

  const table = useMemo(
    () => (
      <div className="product-table-rows__scroll">
        <SuperTable columns={productsColumns} data={tableData} className="product-table-rows" />
      </div>
    ),
    [tableData],
  );

  const panes = useMemo(
    () =>
      stores.map((store) => ({
        menuItem: getAddress(store.address),
        id: store.id,
        render: () => (
          <Tab.Pane className="product-table-rows__wrapper" loading={isLoading && store.id === currentStoreId}>
            {table}
          </Tab.Pane>
        ),
      })),
    [isLoading, stores, currentStoreId, table],
  );

  return (
    <Card fluid className={className}>
      <Tab panes={panes} menu={{ tabular: true, secondary: true, pointing: true }} onTabChange={handleTabChange} />
    </Card>
  );
}

ProductTable.propTypes = {
  className: PropTypes.string,
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      coords: PropTypes.string,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  tableData: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  currentStoreId: PropTypes.string,
  setCurrentStoreId: PropTypes.func.isRequired,
};

ProductTable.defaultProps = {
  className: '',
  currentStoreId: null,
};

export default ProductTable;
