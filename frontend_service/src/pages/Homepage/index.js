import React from 'react';

import './style.scss';

import { Loader } from 'semantic-ui-react';

import { BrandCard } from '../../components';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retailChains: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        retailChains: [
          {
            name: 'Novus',
            avgPricePerKg: 25.44,
            stores: [
              {
                name: 'SkyMall',
                city: 'kiev',
                coords: '50.4931815, 30.5581461',
                lowestPricePerKg: 23,
              },
              {
                name: 'Retroville',
                city: 'kiev',
                coords: '50.5039512, 30.4164598',
                lowestPricePerKg: 21,
              },
              {
                name: 'Николаев',
                city: 'mykolaiv',
                coords: '46.9659448, 32.0773213',
                lowestPricePerKg: 28,
              },
            ],
          },
          {
            name: 'Metro',
            avgPricePerKg: 40,
            stores: [
              {
                name: 'Теремки',
                city: 'kiev',
                coords: '50.37886, 30.44221',
                lowestPricePerKg: 38,
              },
              {
                name: 'Лололошки',
                city: 'kiev',
                coords: '50.17886, 30.44221',
                lowestPricePerKg: 44,
              },
              {
                name: 'Сучі кошки',
                city: 'kiev',
                coords: '50.27886, 30.44221',
                lowestPricePerKg: 42,
              },
            ],
          },
          {
            name: 'Auchan',
            avgPricePerKg: 23.44,
            stores: [
              {
                name: 'Петровка',
                city: 'kiev',
                coords: '50.4931815, 30.5581461',
                lowestPricePerKg: 23,
              },
              {
                name: 'Головка',
                city: 'lviv',
                coords: '50.4931815, 30.5581461',
                lowestPricePerKg: 20,
              },
              {
                name: 'Скуковка',
                city: 'kharkiv',
                coords: '50.4931815, 30.5581461',
                lowestPricePerKg: 21,
              },
            ],
          },
        ],
      });
    }, 500);
  }

  render() {
    return (
      <div className="main-content">
        <div className="cards-wrap">
          {this.state.retailChains.map((brand) => (
            <BrandCard brandData={brand} key={brand.name} />
          ))}
          {!this.state.retailChains.length && <Loader active inline="centered" />}
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {};

export default Homepage;
