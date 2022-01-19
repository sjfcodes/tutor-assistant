import { getApiEndpoint, getRequestHeaders } from '../apiAccess';
import { handleError } from '../../helpers';

/**
 * Provide a model name and a data object to create new db entry
 *
 * @param {Object} body: {
    studentEmail: String, subject: String, text: String, html: String,
  }
 * @returns
 */
const sendEmailtoStudent = ({ body }) => {
  const url = getApiEndpoint({ model: 'sendgrid', action: 'email' });
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
export default sendEmailtoStudent;
