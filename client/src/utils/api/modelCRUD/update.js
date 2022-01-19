import { getApiEndpoint, getRequestHeaders } from '../apiAccess';
import { handleError } from '../../helpers';

/**
 * Update a model by id
 *
 * @param {String} model name of the model to be updated
 * @param {Object} body of model to be updated
 * @returns
 */
const updateModel = ({ model, body, _id }) => {
  const options = {
    method: 'PUT',
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
export default updateModel;
