import { apiUrl, tokenKey } from "./config"


/**
 * provide a model name and a data object to create new db entry
 * 
 * @param {String} modelName name of the model to be created
 * @param {Object} body data to create model with
 * @param {String} parentModelId id of parent model to add new model to
 * @returns 
 */
export const createModel = (modelName, body, parentModelId = '') => {
    const model = modelName.trim().toLowerCase()
    const url = `${apiUrl}/${model}/${parentModelId}`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer: ${localStorage.getItem(tokenKey)}`
        },
        body: JSON.stringify(body),
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

/**
 * update a model by id
 * 
 * @param {String} modelName name of the model to be updated
 * @param {Object} body of model to be updated
 * @returns 
 */
export const updateModel = (modelName, body) => {
    const url = `${apiUrl}/${modelName.trim().toLowerCase()}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer: ${localStorage.getItem(tokenKey)}`
        },
        body: JSON.stringify(body),
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