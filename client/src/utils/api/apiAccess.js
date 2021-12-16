import { APIBase, tokenKey } from '../../config';

/**
 * the url based on the paramaters passed in
 * @param {*} model data model to access
 * @param {*} id target a specific model
 * @returns complete url to access a model
 */
export const getApiEndpoint = ({ model, action, id }) => {
  // https://myserver.com
  // let url = APIBase;
  let url = APIBase;
  // https://myserver.com/modelName
  if (model) url += `/${model}`;
  // https://myserver.com/modelName/action
  if (action) url += `/${action}`;
  // https://myserver.com/modelName[/action?]/:id
  if (id) url += `/${id}`;

  return url;
};

export const getRequestHeaders = () => (
  {
    'Content-Type': 'application/json',
    authorization: `Bearer: ${localStorage.getItem(tokenKey)}`,
  }
);
