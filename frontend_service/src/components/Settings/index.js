import React, { useContext } from 'react';
import { Grid, Header, Radio, Dropdown } from 'semantic-ui-react';

import { store, actions } from '../../utils/store';

const languages = [
  {
    key: 'uk',
    value: 'uk',
    text: 'Українська',
  },
  {
    key: 'en',
    value: 'en',
    text: 'English',
  },
];

function Settings() {
  const { state, dispatch } = useContext(store);
  const onLanguageSelect = (event, { value }) => dispatch({ type: actions.SET_CONTENT_LANGUAGE, payload: value });

  return (
    <Grid>
      <Grid.Column>
        <Header>Settings</Header>
        <Grid.Row className="settings-row__first">
          <Header sub>Dark theme</Header>
          <Radio toggle className="theme-toggle" />
        </Grid.Row>
        <Grid.Row>
          <Header sub>Content language</Header>
          <Dropdown
            selection
            placeholder="Select language"
            options={languages}
            value={state.contentLanguage}
            onChange={onLanguageSelect}
          />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

export default Settings;
