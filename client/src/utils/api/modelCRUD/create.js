import { getApiEndpoint, getRequestHeaders } from '../apiAccess';
import { handleError } from '../../helpers';

/**
 * Provide a model name and a data object to create new db entry
 *
 * @param {String} model name of the model to be created
 * @param {Object} body data to create model with
 * @param {String} id id of parent model to add new model to
 * @returns
 */
const createModel = ({ model, body, _id = '' }) => {
  const options = {
    method: 'POST',
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
export default createModel;
