import React from 'react';
import PropTypes from 'prop-types';

import { Card, List, Checkbox } from 'semantic-ui-react';
import { capitalize } from '../../utils/helpers';

const createFilterList = (filters) =>
  filters.map((filter) => (
    <List.Item>
      <b>{capitalize(filter.name)}</b>
      <List.List>
        {filter.options.map((option) => (
          <List.Item>
            <Checkbox label={capitalize(option.name)} />
          </List.Item>
        ))}
      </List.List>
    </List.Item>
  ));

function DetailsPageFilters({ className, filters }) {
  return (
    <Card fluid className={className}>
      <Card.Content>
        <List>{createFilterList(filters)}</List>
      </Card.Content>
    </Card>
  );
}

DetailsPageFilters.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

DetailsPageFilters.defaultProps = {
  className: '',
};

export default DetailsPageFilters;
