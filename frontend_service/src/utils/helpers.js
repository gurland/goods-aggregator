import { pick, isNil } from 'ramda';
import moment from 'moment';

import { defaultContentLanguage, languageLSKey, darkThemeLSKey } from './constants';

export const sortByArray = (original = [], prop, sortBy = []) => {
  const sorted = [];

  original.forEach((object) => {
    const index = sortBy.indexOf(object[prop]);
    if (index !== -1) {
      sorted[index] = object;
    }
  });

  return sorted;
};

export const getArrayOfProps = (arrayOfObjects, prop) => {
  if (typeof prop === 'string') return arrayOfObjects.map((object) => object[prop]);
  if (Array.isArray(prop)) return arrayOfObjects.map((object) => pick(prop, object));
};

export const removeNil = (array) => array.filter((element) => !isNil(element));

export const capitalize = (string = '') => string.charAt(0).toUpperCase() + string.slice(1);

export const getItemFromLS = (key, defaultValue = null) => localStorage.getItem(key) || defaultValue;

export const getLanguageFromLS = () => getItemFromLS(languageLSKey, defaultContentLanguage);

export const getDarkThemeFromLS = () => JSON.parse(getItemFromLS(darkThemeLSKey, true));

export const createDarkThemeClassName = (className, isDarkTheme) => `${className} ${isDarkTheme ? 'inverted' : ''}`;

export const getAddress = ({ city, street, building }) => [city, street, building].join(', ');

export const formatPrice = (price, defaultValue = 0) => {
  const formattedPrice = (price / 100).toFixed(2);
  return isNaN(formattedPrice) ? defaultValue : formattedPrice;
};

export const getLowestPrice = (data) => {
  return Math.min.apply(
    Math,
    data.map((item) => item.product.price),
  );
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const formatDate = (timestamps) => timestamps.map((ts) => moment.unix(ts).format('DD-MM-YYYY HH:mm'));
