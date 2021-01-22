import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'semantic-ui-react';

function DetailsPageFilters({ className }) {
  return (
    <Card fluid className={className}>
      <Card.Content />
    </Card>
  );
}

DetailsPageFilters.propTypes = {
  className: PropTypes.string,
};

DetailsPageFilters.defaultProps = {
  className: '',
};

export default DetailsPageFilters;
