import React, { useCallback, useState } from 'react';
import { Form, Icon, Input } from 'semantic-ui-react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const handleChange = useCallback((event, { value }) => setQuery(value), [setQuery]);

  return (
    <Form>
      <Form.Field>
        <Input
          className="icon"
          iconPosition="right"
          icon={<Icon name="search" link circular />}
          placeholder="Search..."
          onChange={handleChange}
          value={query}
        />
      </Form.Field>
    </Form>
  );
}

export default SearchBar;
