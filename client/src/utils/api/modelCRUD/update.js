import { getApiEndpoint, getRequestHeaders } from '../apiAccess';
import { handleError } from '../../helpers';

/**
 * Update a model by id
 *
 * @param {String} model name of the model to be updated
 * @param {Object} body of model to be updated
 * @returns
 */
const updateModel = (model, body) => {
  const options = {
    method: 'PUT',
    headers: getRequestHeaders(),
    body: JSON.stringify(body),
  };

  return new Promise((resolve, reject) => {
    try {
      fetch(getApiEndpoint({ model }), options)
        .then((res) => (res.status === 200 ? res.json() : null))
        .then((data) => {
          if (!data) return reject(handleError('missing model data'));
          return resolve(data);
        });
    } catch (error) {
      reject(handleError('request failed'));
    }
  });
};
export default updateModel;
