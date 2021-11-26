import { apiUrl, tokenKey } from "../config"


export const addCourse = (tutor_id, name) => {
    const url = `${apiUrl}/course`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer: ${localStorage.getItem(tokenKey)}`
        },
        body: JSON.stringify({ tutor_id, name }),
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


export const deleteCourse = (_id) => {
    const url = `${apiUrl}/course`
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


export const updateCourse = (_id, name) => {
    const url = `${apiUrl}/course`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer: ${localStorage.getItem(tokenKey)}`
        },
        body: JSON.stringify({ _id, name }),
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