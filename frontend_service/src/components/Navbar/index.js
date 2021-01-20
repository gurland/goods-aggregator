import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Input } from 'semantic-ui-react';

function Navbar(props) {
  return (
    <Menu fluid widths={3}>
      <Menu.Item>
        <Input className="icon" icon="search" placeholder="Search..." />
      </Menu.Item>
    </Menu>
  );
}

Navbar.propTypes = {};

export default Navbar;
