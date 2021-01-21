import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'semantic-ui-react';

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
        {/* findDOMNode is deprecated in StrictMode. */}
        {/* <Button primary>Details</Button> */}
        <button className="ui primary button">Details</button>
        <span className="price">{props.brandData.avgPricePerKg + ' ₴'}</span>
      </Card.Content>
    </Card>
  );
}

BrandCard.propTypes = {};

export default BrandCard;
