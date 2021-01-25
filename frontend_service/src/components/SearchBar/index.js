import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Icon, Input } from 'semantic-ui-react';

import { store, actions } from '../../utils/store';
import { searchProducts } from '../../utils/api';
import { links } from '../../utils/constants';

function SearchBar() {
  const [query, setQuery] = useState('');
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const handleChange = useCallback((event, { value }) => setQuery(value), [setQuery]);

  const onSearch = useCallback(() => {
    history.push(links.homepage);
    dispatch({ type: actions.SAVE_SEARCH_QUERY, payload: query });

    (async () => {
      dispatch({ type: actions.SET_HOMEPAGE_LOADING, payload: true });
      const { data, status } = await searchProducts({ q: query }, state.contentLanguage);
      if (data?.length && status === 200) {
        dispatch({ type: actions.SAVE_RETAIL_CHAINS, payload: data });
        dispatch({ type: actions.SET_HOMEPAGE_LOADING, payload: false });

        setQuery('');
      }
    })();
  }, [dispatch, history, query, state.contentLanguage]);

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
