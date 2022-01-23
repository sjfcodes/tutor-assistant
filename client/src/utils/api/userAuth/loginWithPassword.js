import { handleError } from '../../helpers';
import { getApiEndpoint } from '../apiAccess';

const loginWithPassword = (inputs) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };

  return new Promise((resolve, reject) => {
    try {
      fetch(getApiEndpoint({ model: 'tutor', action: 'login' }), options)
        .then((res) => res.json())
        .then(({ token, tutor, courses }) => {
          if (!token || !tutor) return reject(handleError('unauthorized'));
          return resolve({ tutor, token, courses });
        });
    } catch (error) {
      reject(handleError(error));
    }
  });
};
export default loginWithPassword;
