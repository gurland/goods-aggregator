import React, { useContext } from 'react';
import { Grid, Header, Radio, Dropdown } from 'semantic-ui-react';

import { store, actions } from '../../utils/store';
import { createDarkThemeClassName } from '../../utils/helpers';

import './style.scss';

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
  const onDarkThemeToggle = () => dispatch({ type: actions.DARK_THEME_TOGGLE, payload: !state.darkTheme });

  return (
    <Grid>
      <Grid.Column>
        <Header>Settings</Header>
        <Grid.Row className="settings-row__first">
          <Header sub>Dark theme</Header>
          <Radio toggle className="theme-toggle" onClick={onDarkThemeToggle} checked={state.darkTheme} />
        </Grid.Row>
        <Grid.Row>
          <Header sub>Content language</Header>
          <Dropdown
            selection
            placeholder="Select language"
            options={languages}
            value={state.contentLanguage}
            onChange={onLanguageSelect}
            className={createDarkThemeClassName('', state.darkTheme)}
          />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

export default Settings;
