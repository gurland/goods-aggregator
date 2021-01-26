import axios from 'axios';
import { pick } from 'ramda';
import qs from 'qs';

import { storeListUrl, storeSearchUrl, zakazSearchUrl, graphSearchUrl } from './constants';
import { getLanguageFromLS } from './helpers';

const createUrl = (storeId = null, category = null) => {
  if (storeId && !category) return zakazSearchUrl.replace('{STORE_ID}', storeId);
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

  return createGetRequest(url, {
    params: filters,
    headers: { 'Accept-Language': contentLanguage },
  });
};

export const searchProducts = async (filters = {}, language) => {
  const url = createUrl();
  const contentLanguage = language || getLanguageFromLS();

  return createGetRequest(url, {
    params: filters,
    headers: { 'Accept-Language': contentLanguage },
  });
};

export const getChartData = async (storeId, ean = '') => {
  const url = graphSearchUrl + storeId + '/' + ean;

  return createGetRequest(url, {});
};
