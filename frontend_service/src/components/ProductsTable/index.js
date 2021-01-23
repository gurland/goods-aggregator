import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Tab } from 'semantic-ui-react';

import SuperTable from '../SuperTable';
import { productsColumns } from './constants';
import { getProducts } from '../../utils/api';

import './style.scss';

function ProductTable({ className, stores, category }) {
  const [firstStore] = stores;

  const [isLoading, setIsLoading] = useState(true);
  const [currentStoreId, setCurrentStoreId] = useState(firstStore.id);
  const [tableData, setTableData] = useState([]);

  const handleTabChange = useCallback((event, { activeIndex, panes }) => setCurrentStoreId(panes[activeIndex].id), []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data } = await getProducts(currentStoreId, category);
      if (data.results?.length) {
        setTableData(data.results);
      }
      setIsLoading(false);
    })();
  }, [currentStoreId, category]);

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
        menuItem: store.name,
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
  category: PropTypes.string.isRequired,
};

ProductTable.defaultProps = {
  className: '',
};

export default ProductTable;
