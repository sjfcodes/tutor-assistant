import { apiUrl, tokenKey } from '../../config';

/**
 * Provide a model name and a data object to create new db entry
 *
 * @param {String} modelName name of the model to be created
 * @param {Object} body data to create model with
 * @param {String} parentModelId id of parent model to add new model to
 * @returns
 */
export const createModel = (modelName, body, parentModelId = '') => {
  const model = modelName.trim().toLowerCase(),
    url = `${apiUrl}/${model}/${parentModelId}`,
    options = {
      method: 'POST',
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
