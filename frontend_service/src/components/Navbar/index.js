import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Input, Radio, Button, Icon } from 'semantic-ui-react';
import './style.scss';

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
        <Menu fluid widths={3}>
          <Menu.Item />
          <Menu.Item>
            <Button primary basic>
              Open map
            </Button>
          </Menu.Item>
          <Menu.Menu position="right" />
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
