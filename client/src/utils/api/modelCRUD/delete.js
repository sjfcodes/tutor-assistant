import { getApiEndpoint, getRequestHeaders } from '../apiAccess';
import { handleError } from '../../helpers';

/**
 * Delete a model by id
 *
 * @param {String} model model to be access
 * @param {String} id id of model to be deleted
 * @returns
 */
const deleteModel = (model, id) => {
  const options = {
    method: 'DELETE',
    headers: getRequestHeaders(),
    body: JSON.stringify({ id }),
  };

  return new Promise((resolve, reject) => {
    try {
      fetch(getApiEndpoint({ model, id }), options)
        .then((res) => (res.status === 200 ? res.json() : null))
        .then((data) => {
          if (!data) return reject(handleError('missing response data'));
          return resolve(data);
        });
    } catch (err) {
      console.warn(err);
      reject(handleError(err));
    }
  });
};

export default deleteModel;
