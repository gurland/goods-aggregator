import axios from 'axios';
import { pick } from 'ramda';
import qs from 'qs';

import { storeApiUrl } from './constants';

const createUrl = (storeId, category) => storeApiUrl.replace('{STORE_ID}', storeId).replace('{CATEGORY}', category);

const createGetRequest = async (url, { params = {}, errorResponse }) => {
  try {
    const response = await axios.get(url, {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
    return pick(['data', 'status'], response);
  } catch (e) {
    return errorResponse || e.response;
  }
};

export const getProducts = async (storeId, category, filters = {}) => {
  const url = createUrl(storeId, category);
  return await createGetRequest(url, { errorResponse: [], params: filters });
};
