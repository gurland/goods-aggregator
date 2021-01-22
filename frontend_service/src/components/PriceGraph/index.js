import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'semantic-ui-react';

function PriceGraph({ className }) {
  return (
    <Card fluid className={className}>
      <Card.Content /> {/* <-- Рома, в'єби тут графік */}
    </Card>
  );
}

PriceGraph.propTypes = {
  className: PropTypes.string,
};

PriceGraph.defaultProps = {
  className: '',
};

export default PriceGraph;
