import { apiUrl, tokenKey } from '../../config';

export const loginWithPassword = (inputs) => {
  const url = `${apiUrl}/tutor/login`,
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
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
