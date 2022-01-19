import { tokenKey } from '../../../config';
import { handleError } from '../../helpers';
import { getApiEndpoint, getRequestHeaders } from '../apiAccess';

const loginWithToken = () => {
  const options = {
    method: 'GET',
    headers: getRequestHeaders(),
  };
  return new Promise((resolve, reject) => {
    try {
      fetch(getApiEndpoint({ model: 'tutor', action: 'login' }), options)
        .then((res) => res.json())
        .then((data) => {
          if (!data.token || !data.tutor) return reject(handleError('unauthorized'));
          localStorage.setItem(tokenKey, data.token);
          return resolve(data);
        });
    } catch (error) {
      localStorage.removeItem(tokenKey);
      reject(handleError(error));
    }
  });
};
export default loginWithToken;
