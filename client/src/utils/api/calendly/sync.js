import { getApiEndpoint, getRequestHeaders } from '../apiAccess';
import { handleError } from '../../helpers';

/**
 *
 * @param {*} body { password: String, courseId, String }
 * @returns
 */
const syncCalendlyResource = ({ body }) => {
  const url = getApiEndpoint({ model: 'calendly', action: 'sync' });
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
          if (data.message) return reject(handleError(data.message));
          return resolve(data);
        });
    } catch (error) {
      reject(handleError(error));
    }
  });
};
export default syncCalendlyResource;
