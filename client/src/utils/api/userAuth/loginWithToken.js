import { apiUrl, tokenKey } from '../../config';

export const loginWithToken = (token) => {
  const url = `${apiUrl}/tutor`,
    options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  return new Promise((resolve, reject) => {
    try {
      fetch(url, options)
        .then((res) => res.json())
        .then(({ token, tutor, courses }) => {
          if (!token || !tutor) return reject(null);
          localStorage.setItem(tokenKey, token);
          resolve({ tutor, courses });
        });
    } catch (error) {
      console.error(error);
      reject(null);
    }
  });
};
