import React from 'react';
import { Table } from 'semantic-ui-react';

import { sortByArray, getArrayOfProps } from '../../utils/helpers';

export const createHeaderRow = (columns) => {
  return (
    <Table.Row>
      {columns.map(({ header, selector }) => {
        let headerContent;

        if (header instanceof Function) headerContent = header();
        else if (typeof header === 'string') headerContent = header;
        else headerContent = '-';

        return <Table.HeaderCell key={selector}>{headerContent}</Table.HeaderCell>;
      })}
    </Table.Row>
  );
};

export const createBodyRows = (columns, metadata) =>
  metadata.map((cells) => (
    <Table.Row>
      {sortByArray(cells, 'key', getArrayOfProps(columns, 'selector')).map(({ cell, original, key }) => (
        <Table.Cell key={key}>{cell(original)}</Table.Cell> // TODO generate key based on id or any other unique data from api
      ))}
    </Table.Row>
  ));

export const createBodyRowsMetadata = (columns, data) =>
  data.map((original) => {
    const keys = Object.keys(original);
    return keys.map((key) => {
      const { cell } = columns.find(({ selector }) => selector === key);
      return { cell, original, key };
    });
  });
