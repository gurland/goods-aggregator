import React from 'react';

import { Menu, Input, Radio } from 'semantic-ui-react';
import './style.scss';

import { MapModal } from '../index';

function Navbar(props) {
  return (
    <span>
      {props.position === 'top' && (
        <Menu fluid widths={3}>
          <Menu.Item />
          <Menu.Item>
            <Input className="icon" iconPosition="left" icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item position="right">
            <Radio toggle />
          </Menu.Item>
        </Menu>
      )}
      {props.position === 'bottom' && (
        <Menu fluid widths={3}>
          <Menu.Item>
            <MapModal />
          </Menu.Item>
        </Menu>
      )}
    </span>
  );
}

Navbar.propTypes = {};

export default Navbar;
