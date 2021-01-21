import React from 'react';

import { Menu, Input, Radio, Button } from 'semantic-ui-react';
import './style.scss';

function Navbar(props) {
  return (
    <span>
      {props.position === 'top' && (
        <Menu fluid widths={3}>
          <Menu.Item></Menu.Item>
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
          <Menu.Item></Menu.Item>
          <Menu.Item>
            <Button primary basic>
              Open map
            </Button>
          </Menu.Item>
          <Menu.Menu position="right"></Menu.Menu>
        </Menu>
      )}
    </span>
  );
}

Navbar.propTypes = {};

export default Navbar;
