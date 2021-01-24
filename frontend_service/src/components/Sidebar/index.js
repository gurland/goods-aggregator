import React, { useContext } from 'react';
import { Sidebar as SemanticSidebar } from 'semantic-ui-react';

import { store, actions } from '../../utils/store';
import DetailsPageFilters from '../DetailsPageFilters';

import './style.scss';

// eslint-disable-next-line react/prop-types
function Sidebar({ children }) {
  const { state, dispatch } = useContext(store);
  const onHide = () => dispatch({ type: actions.SIDEBAR_TOGGLE, payload: false });

  const { sidebarVisible, filters, selectedFilters } = state;

  return (
    <SemanticSidebar.Pushable>
      <SemanticSidebar visible={sidebarVisible} direction="right" animation="overlay" vertical onHide={onHide}>
        <DetailsPageFilters filters={filters} selectedFilters={selectedFilters} className="sidebar__filters" />
      </SemanticSidebar>
      <SemanticSidebar.Pusher>{children}</SemanticSidebar.Pusher>
    </SemanticSidebar.Pushable>
  );
}

export default Sidebar;
