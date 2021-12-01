import { apiUrl, tokenKey } from "../../config"


/**
 * delete a model by id
 * 
 * @param {String} modelName name of the model to be deleted
 * @param {String} _id id of model to be deleted
 * @returns 
 */
export const deleteModel = (modelName, _id) => {
    const url = `${apiUrl}/${modelName.trim().toLowerCase()}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer: ${localStorage.getItem(tokenKey)}`
        },
        body: JSON.stringify({ _id }),
    }

    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetch(url, options).then(res => res.status === 200 ? res.json() : null)
            if (!data) return reject(null)
            resolve(data)

        } catch (error) {
            console.error(error)
            reject(null)
        }
    })
}