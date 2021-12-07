import { apiUrl, tokenKey } from '../../config';

/**
 * Update a model by id
 *
 * @param {String} modelName name of the model to be updated
 * @param {Object} body of model to be updated
 * @returns
 */
export const updateModel = (modelName, body) => {
  const url = `${apiUrl}/${modelName.trim().toLowerCase()}`,
    options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer: ${localStorage.getItem(tokenKey)}`,
      },
      body: JSON.stringify(body),
    };

  return new Promise((resolve, reject) => {
    try {
      fetch(url, options)
        .then((res) => (res.status === 200 ? res.json() : null))
        .then((data) => {
          if (!data) return reject(null);
          resolve(data);
        });
    } catch (error) {
      console.error(error);
      reject(null);
    }
  });
};
