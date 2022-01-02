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
const syncCalendlyResource = (body) => {
  // const url = 'http://localhost:3001/api/calendly/users/me';
  const url = getApiEndpoint({ model: 'calendly', action: 'users/me' });
  const options = {
    method: 'POST',
    headers: getRequestHeaders(),
    body: JSON.stringify(body),
  };

  return new Promise((resolve, reject) => {
    try {
      fetch(url, options)
        .then((res) => (res.status === 200 ? res.json() : null))
        .then((data) => {
          if (!data) return reject(handleError('syncCalendlyResource failed:0'));
          return resolve(data);
        });
    } catch (error) {
      reject(handleError(error));
    }
  });
};
export default syncCalendlyResource;
