import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';
import { createBodyRows, createHeaderRow, createBodyRowsMetadata } from './helpers';
import './style.scss';
import { createDarkThemeClassName } from '../../utils/helpers';
import { store } from '../../utils/store';

function SuperTable({ columns, data, className }) {
  const { state } = useContext(store);
  const rowsMetadata = createBodyRowsMetadata(columns, data);
  return (
    <Table celled padded compact="very" selectable className={createDarkThemeClassName(className, state.darkTheme)}>
      <Table.Header>{createHeaderRow(columns)}</Table.Header>
      <Table.Body>{createBodyRows(columns, rowsMetadata)}</Table.Body>
    </Table>
  );
}

SuperTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      selector: PropTypes.string.isRequired,
      cell: PropTypes.func.isRequired,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  className: PropTypes.string,
};

SuperTable.defaultProps = {
  className: '',
};

export default SuperTable;
