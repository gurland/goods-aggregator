import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

import { Menu, Input, Icon, Popup } from 'semantic-ui-react';
import { links } from '../../utils/constants';
import { store, actions } from '../../utils/store';
import './style.scss';

import { MapModal, Settings } from '../index';

function Navbar(props) {
  const { dispatch, state } = useContext(store);
  const history = useHistory();

  const showIcons = useLocation().pathname === links.details;
  const toggleSidebar = () => dispatch({ type: actions.SIDEBAR_TOGGLE, payload: !state.sidebarVisible });
  const goToHomepage = () => history.push(links.homepage);

  return (
    <span className={state.darkTheme ? 'inverted navbar' : 'navbar'}>
      {props.position === 'top' && (
        <Menu fluid widths={3} inverted={state.darkTheme}>
          <Menu.Item>
            {showIcons && <Icon name="arrow left" className="navbar-icon arrow-icon" onClick={goToHomepage} />}
          </Menu.Item>
          <Menu.Item>
            <Input className="icon" iconPosition="left" icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item position="right">
            <Popup
              pinned
              on="click"
              content={<Settings />}
              trigger={<Icon name="setting" className="navbar-icon settings-icon" />}
              position="bottom right"
              inverted={state.darkTheme}
            />
            {showIcons && (
              <Icon
                name="bars"
                className="navbar-icon burger-menu"
                onClick={toggleSidebar}
                inverted={state.darkTheme}
              />
            )}
          </Menu.Item>
        </Menu>
      )}
      {props.position === 'bottom' && (
        <Menu fluid widths={1} inverted={state.darkTheme}>
          <Menu.Item>
            <MapModal />
          </Menu.Item>
        </Menu>
      )}
    </span>
  );
}

Navbar.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom']),
};

Navbar.deafultProps = {
  position: 'top',
};

export default Navbar;
