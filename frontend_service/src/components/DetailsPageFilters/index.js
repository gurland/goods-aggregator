import React from 'react';
import PropTypes from 'prop-types';

import { Card, List, Checkbox, Loader } from 'semantic-ui-react';
import { capitalize } from '../../utils/helpers';

function DetailsPageFilters({ className, filters, selectedFilters, setSelectedFilters, isLoading }) {
  const handleCheck = (type, query) =>
    setSelectedFilters((prevState) => {
      const filters = prevState[type];

      if (!filters) {
        return {
          ...prevState,
          [type]: [query],
        };
      }

      if (filters.includes(query)) {
        return {
          ...prevState,
          [type]: filters.filter((existingQuery) => query !== existingQuery),
        };
      } else {
        return {
          ...prevState,
          [type]: [...filters, query],
        };
      }
    });

  const createFilterList = (filters) =>
    filters.map((filter) => {
      const type = filter.type;
      return (
        <List.Item key={type}>
          <b>{capitalize(filter.name)}</b>
          <List.List>
            {filter.options.map((option) => {
              const query = option.query;
              const isChecked = selectedFilters[type]?.includes(query);

              return (
                <List.Item key={`${type}_${query}`}>
                  <Checkbox
                    label={capitalize(option.name)}
                    onChange={() => handleCheck(type, query)}
                    checked={isChecked}
                  />
                </List.Item>
              );
            })}
          </List.List>
        </List.Item>
      );
    });

  return (
    <Card fluid className={className}>
      <Card.Content>
        {isLoading ? <Loader active inline="centered" /> : <List>{createFilterList(filters)}</List>}
      </Card.Content>
    </Card>
  );
}

DetailsPageFilters.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  selectedFilters: PropTypes.instanceOf(Object).isRequired,
  setSelectedFilters: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

DetailsPageFilters.defaultProps = {
  className: '',
};

export default DetailsPageFilters;
