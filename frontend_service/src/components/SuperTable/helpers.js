import React from 'react';
import { Table } from 'semantic-ui-react';

import { sortByArray, getArrayOfProps, removeNil } from '../../utils/helpers';

export const createHeaderRow = (columns) => {
  return (
    <Table.Row>
      {columns.map(({ header, selector }) => {
        let headerContent;

        if (header instanceof Function) headerContent = header();
        else if (typeof header === 'string') headerContent = header;
        else headerContent = '';

        return <Table.HeaderCell key={selector}>{headerContent}</Table.HeaderCell>;
      })}
    </Table.Row>
  );
};

export const createBodyRows = (columns, metadata) =>
  metadata.map((cells, index) => (
    <Table.Row key={index}>
      {sortByArray(cells, 'key', getArrayOfProps(columns, 'selector')).map(({ cell, original, key }) => (
        <Table.Cell key={`${original.id}_${key}`}>{cell(original)}</Table.Cell>
      ))}
    </Table.Row>
  ));

export const createBodyRowsMetadata = (columns, data) =>
  data.map((original) => {
    const keys = Object.keys(original);
    return removeNil(
      keys.map((key) => {
        const column = columns.find(({ selector }) => selector === key);
        if (column) {
          return { cell: column.cell, original, key };
        }
      }),
    );
  });
