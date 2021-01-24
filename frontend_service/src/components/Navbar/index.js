import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { Menu, Input, Radio, Icon } from 'semantic-ui-react';
import { links } from '../../utils/constants';
import { store, actions } from '../../utils/store';
import './style.scss';

import { MapModal } from '../index';

function Navbar(props) {
  const { dispatch, state } = useContext(store);

  const showBurger = useLocation().pathname === links.details;
  const toggleSidebar = () => dispatch({ type: actions.SIDEBAR_TOGGLE, payload: !state.sidebarVisible });

  return (
    <span className="navbar">
      {props.position === 'top' && (
        <Menu fluid widths={3}>
          <Menu.Item />
          <Menu.Item>
            <Input className="icon" iconPosition="left" icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item position="right">
            <Radio toggle className="theme-toggle" />
            {showBurger && <Icon name="bars" className="burger-menu" onClick={toggleSidebar} />}
          </Menu.Item>
        </Menu>
      )}
      {props.position === 'bottom' && (
        <Menu fluid widths={1}>
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
