import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Icon, Input } from 'semantic-ui-react';

import { store, actions } from '../../utils/store';
import { links } from '../../utils/constants';

function SearchBar() {
  const [query, setQuery] = useState('');
  const { dispatch } = useContext(store);
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
        />
      </Form.Field>
    </Form>
  );
}

export default SearchBar;
