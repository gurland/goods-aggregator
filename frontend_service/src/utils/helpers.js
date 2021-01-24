import { pick, isNil } from 'ramda';
import { defaultContentLanguage, languageLSKey } from './constants';

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

export const getLanguageFromLS = () => localStorage.getItem(languageLSKey) || defaultContentLanguage;
