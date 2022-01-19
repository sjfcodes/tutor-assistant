import { getApiEndpoint, getRequestHeaders } from '../apiAccess';
import { handleError } from '../../helpers';

/**
 * Delete a model by id
 *
 * @param {String} model model to be access
 * @param {String} id id of model to be deleted
 * @returns
 */
const deleteModel = ({ model, _id, body }) => {
  const options = {
    method: 'DELETE',
    headers: getRequestHeaders(),
    body: JSON.stringify(body),
  };
  return new Promise((resolve, reject) => {
    try {
      fetch(getApiEndpoint({ model, _id }), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) return reject(handleError(data.message));
          return resolve(data);
        });
    } catch (error) {
      reject(handleError(error));
    }
  });
};

export default deleteModel;
