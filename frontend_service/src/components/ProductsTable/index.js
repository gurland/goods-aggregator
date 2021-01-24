import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Tab } from 'semantic-ui-react';

import SuperTable from '../SuperTable';
import { productsColumns } from './constants';
import { createDarkThemeClassName } from '../../utils/helpers';

import './style.scss';
import { store } from '../../utils/store';

function ProductTable({ className, stores, isLoading, tableData, currentStoreId, setCurrentStoreId }) {
  const { state } = useContext(store);
  const isDarkTheme = state.darkTheme;

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
        menuItem: store.name,
        id: store.id,
        render: () => (
          <Tab.Pane
            className={createDarkThemeClassName('product-table-rows__wrapper', isDarkTheme)}
            loading={isLoading && store.id === currentStoreId}
          >
            {table}
          </Tab.Pane>
        ),
      })),
    [stores, isDarkTheme, isLoading, currentStoreId, table],
  );

  return (
    <Card fluid className={createDarkThemeClassName(className, isDarkTheme)}>
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
