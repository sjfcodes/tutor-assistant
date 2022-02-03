import { BASE_URL_API, LOCAL_STORAGE_KEY } from '../../config';

/**
 * the url based on the paramaters passed in
 * @param {*} model data model to access
 * @param {*} id target a specific model
 * @returns complete url to access a model
 */
export const getApiEndpoint = ({ model, action, _id }) => {
  let url = BASE_URL_API;
  if (model) url += `/${model}`;
  if (action) url += `/${action}`;
  if (_id) url += `/${_id}`;

  return url;
};

export const getRequestHeaders = () => (
  {
    'Content-Type': 'application/json',
    authorization: `Bearer: ${localStorage.getItem(LOCAL_STORAGE_KEY)}`,
  }
);
