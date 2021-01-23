import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Input, Radio, Icon } from 'semantic-ui-react';
import './style.scss';

import { MapModal } from '../index';

function Navbar(props) {
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
            <Icon name="bars" className="burger-menu" />
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
