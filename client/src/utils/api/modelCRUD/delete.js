import { apiUrl, tokenKey } from '../../config';

/**
 * Delete a model by id
 *
 * @param {String} modelName name of the model to be deleted
 * @param {String} _id id of model to be deleted
 * @returns
 */
export const deleteModel = (modelName, _id) => {
  const url = `${apiUrl}/${modelName.trim().toLowerCase()}`,
    options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer: ${localStorage.getItem(tokenKey)}`,
      },
      body: JSON.stringify({ _id }),
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
