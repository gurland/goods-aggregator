import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Icon, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { store, actions } from '../../utils/store';
import { links } from '../../utils/constants';

function SearchBar({ inputRef }) {
  const { state, dispatch } = useContext(store);
  const [query, setQuery] = useState(state.searchQuery);
  const history = useHistory();

  const handleChange = useCallback((event, { value }) => setQuery(value), [setQuery]);

  const onSearch = useCallback(() => {
    dispatch({ type: actions.SAVE_SEARCH_QUERY, payload: query });
    history.push(links.homepage);
  }, [dispatch, history, query]);

  return (
    <Form onSubmit={onSearch}>
      <Form.Field>
        <Input
          className="icon"
          iconPosition="right"
          icon={<Icon name="search" link circular onClick={onSearch} />}
          placeholder="Search..."
          onChange={handleChange}
          value={query}
          ref={inputRef}
        />
      </Form.Field>
    </Form>
  );
}

SearchBar.propTypes = {
  inputRef: PropTypes.instanceOf(Object),
};

export default SearchBar;
