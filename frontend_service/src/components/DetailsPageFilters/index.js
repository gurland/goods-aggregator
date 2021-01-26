import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import { Card, List, Checkbox, Loader } from 'semantic-ui-react';
import { capitalize, createDarkThemeClassName } from '../../utils/helpers';
import { actions, store } from '../../utils/store';
import SortSlider from '../SortSlider';

function DetailsPageFilters({ className, filters, selectedFilters, isLoading }) {
  const { dispatch, state } = useContext(store);

  const setSelectedFilters = useCallback(
    (newFilters) => dispatch({ type: actions.SELECT_FILTERS, payload: newFilters }),
    [dispatch],
  );

  const handleCheck = (type, query) => {
    const prevState = selectedFilters;
    const filters = prevState[type];
    let newFilters;

    if (!filters) {
      newFilters = {
        ...prevState,
        [type]: [query],
      };
    } else {
      if (filters.includes(query)) {
        newFilters = {
          ...prevState,
          [type]: filters.filter((existingQuery) => query !== existingQuery),
        };
      } else {
        newFilters = {
          ...prevState,
          [type]: [...filters, query],
        };
      }
    }

    setSelectedFilters(newFilters);
  };

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
    <Card fluid className={createDarkThemeClassName(className, state.darkTheme)}>
      <Card.Content>
        {isLoading && !filters.length ? (
          <Loader active inline="centered" />
        ) : (
          <List>
            <SortSlider />
            {createFilterList(filters)}
          </List>
        )}
      </Card.Content>
    </Card>
  );
}

DetailsPageFilters.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  selectedFilters: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool,
};

DetailsPageFilters.defaultProps = {
  className: '',
  isLoading: false,
};

export default DetailsPageFilters;
