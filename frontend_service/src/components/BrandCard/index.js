import React from 'react';

import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

function BrandCard(props) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{props.brandData.name}</Card.Header>
        <Card.Description>
          <div className="info-wrap">
            {props.brandData.stores.map((store) => (
              <div className="info" key={store.name}>
                <span className="name">{store.name}</span>
                <span className="value">{store.lowestPricePerKg + ' ₴'}</span>
              </div>
            ))}
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button primary>Details</Button>
        <span className="price">{props.brandData.avgPricePerKg + ' ₴'}</span>
      </Card.Content>
    </Card>
  );
}

BrandCard.propTypes = {
  brandData: PropTypes.shape({
    name: PropTypes.string,
    avgPricePerKg: PropTypes.number,
    stores: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        city: PropTypes.string,
        coords: PropTypes.string,
        lowestPricePerKg: PropTypes.number,
      }),
    ),
  }),
};

export default BrandCard;