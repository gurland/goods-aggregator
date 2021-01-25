import axios from 'axios';
import { pick } from 'ramda';
import qs from 'qs';

import { storeListUrl, storeSearchUrl } from './constants';
import { getLanguageFromLS } from './helpers';

const createUrl = (storeId = null, category = null) => {
  if (!(category && storeId)) return storeSearchUrl;
  return storeListUrl.replace('{STORE_ID}', storeId).replace('{CATEGORY}', category);
};

const createGetRequest = async (url, { params = {}, headers = {} }) => {
  try {
    const response = await axios.get(url, {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
      headers,
    });
    return pick(['data', 'status'], response);
  } catch (e) {
    return e.response || {};
  }
};

export const getProducts = async (storeId, category, filters = {}, language) => {
  const url = createUrl(storeId, category);
  const contentLanguage = language || getLanguageFromLS();

  return await createGetRequest(url, {
    params: filters,
    headers: { 'Accept-Language': contentLanguage },
  });
};
