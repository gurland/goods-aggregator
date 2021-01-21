import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Input } from 'semantic-ui-react';
import './style.scss';

function Navbar(props) {
  return (
    <Menu fluid widths={3}>
      <Menu.Item></Menu.Item>
      <Menu.Item>
        <Input className="icon" icon="search" placeholder="Search..." />
      </Menu.Item>
      <Menu.Menu position="right"></Menu.Menu>
    </Menu>
  );
}

Navbar.propTypes = {};

export default Navbar;
