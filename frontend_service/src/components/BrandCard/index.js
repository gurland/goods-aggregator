import React, { useContext } from 'react';

import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { links } from '../../utils/constants';
import { getArrayOfProps, createDarkThemeClassName } from '../../utils/helpers';
import { store } from '../../utils/store';
import './style.scss';

function BrandCard({ brandData }) {
  const { state } = useContext(store);

  return (
    <Card className={createDarkThemeClassName('brand-card', state.darkTheme)}>
      <Card.Content>
        <Card.Header>{brandData.name}</Card.Header>
        <Card.Description>
          <div className="info-wrap">
            {brandData.stores.map((store) => (
              <div className="info" key={store.id}>
                <span className="name">{store.name}</span>
                <span className="value">{store.lowestPricePerKg + ' ₴'}</span>
              </div>
            ))}
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link
          to={{
            pathname: links.details,
            stores: getArrayOfProps(brandData.stores, ['id', 'name', 'coords']),
            category: brandData.buckwheatUrlPath,
          }}
        >
          <Button primary>Details</Button>
        </Link>
        <span className="price">{brandData.avgPricePerKg + ' ₴'}</span>
      </Card.Content>
    </Card>
  );
}

BrandCard.propTypes = {
  brandData: PropTypes.shape({
    name: PropTypes.string,
    avgPricePerKg: PropTypes.number,
    buckwheatUrlPath: PropTypes.string,
    stores: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        city: PropTypes.string,
        coords: PropTypes.string,
        lowestPricePerKg: PropTypes.number,
      }),
    ),
  }),
};

export default BrandCard;
