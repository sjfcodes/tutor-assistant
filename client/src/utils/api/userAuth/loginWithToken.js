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
        .then(({ token, tutor, courses }) => {
          if (!token || !tutor) return reject(handleError('missing tutor data'));
          localStorage.setItem(tokenKey, token);
          return resolve({ tutor, courses });
        });
    } catch (error) {
      reject(handleError(error));
    }
  });
};
export default loginWithToken;
