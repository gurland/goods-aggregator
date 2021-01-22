import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';
import { createBodyRows, createHeaderRow, createBodyRowsMetadata } from './helpers';

function SuperTable({ columns, data }) {
  const rowsMetadata = createBodyRowsMetadata(columns, data);
  return (
    <Table celled padded>
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
};

export default SuperTable;