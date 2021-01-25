import React from 'react';

import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { links } from '../../utils/constants';
import { getArrayOfProps } from '../../utils/helpers';
import './style.scss';

function BrandCard({ brandData }) {
  return (
    <Card className="brand-card">
      <Card.Content>
        <Card.Header>{brandData.name}</Card.Header>
        <Card.Description>
          <div className="info-wrap">
            {brandData.stores.map((store) => {
              const {
                address: { city, street, building },
                product,
              } = store;
              const address = [city, street, building].join(', ');
              return (
                <div className="info" key={store.id}>
                  <span className="name">{address}</span>
                  <span className="value">{product.price + ' ₴'}</span>
                </div>
              );
            })}
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link
          to={{
            pathname: links.details,
            stores: getArrayOfProps(brandData.stores, ['id', 'address', 'coords']),
            category: brandData.buckwheat_slug || null,
          }}
        >
          <Button primary>Details</Button>
        </Link>
        <span className="price">{brandData.avg_price + ' ₴'}</span>
      </Card.Content>
    </Card>
  );
}

BrandCard.propTypes = {
  brandData: PropTypes.shape({
    name: PropTypes.string,
    avg_price: PropTypes.number,
    buckwheat_slug: PropTypes.string,
    stores: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        region_id: PropTypes.string,
        coords: PropTypes.string,
        address: PropTypes.shape({
          city: PropTypes.string,
          street: PropTypes.string,
          building: PropTypes.string,
        }),
        product: PropTypes.shape({
          ean: PropTypes.number,
          title: PropTypes.string,
          price: PropTypes.number,
          weight: PropTypes.number,
          web_url: PropTypes.string,
        }),
      }),
    ),
  }),
};

export default BrandCard;
