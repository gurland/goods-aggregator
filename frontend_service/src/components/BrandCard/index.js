import React from 'react';

import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { links } from '../../utils/constants';
import { getArrayOfProps, getAddress, formatPrice } from '../../utils/helpers';
import './style.scss';

function BrandCard({ brandData }) {
  return (
    <Card className="brand-card">
      <Card.Content>
        <Card.Header className="retail-name">{brandData.name}</Card.Header>
        <Card.Description>
          <div className="info-wrap">
            {brandData.stores.map((store) => {
              const { address: addressData, product } = store;
              const address = getAddress(addressData);
              return (
                <div className="info" key={store.id}>
                  <span className="name" title={address}>
                    {address}
                  </span>
                  <span className="value">{formatPrice(product.price) + ' ₴'}</span>
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
            retailChain: brandData.name,
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
        id: PropTypes.string,
        region_id: PropTypes.string,
        coords: PropTypes.string,
        address: PropTypes.shape({
          city: PropTypes.string,
          street: PropTypes.string,
          building: PropTypes.string,
        }),
        product: PropTypes.shape({
          ean: PropTypes.string,
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
