import { apiUrl, tokenKey } from "../config"

export const loginWithPassword = (tutor) => {
    const url = `${apiUrl}/tutor/login`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tutor),
    }

    return new Promise(async (resolve, reject) => {
        try {
            const { token, tutor } = await fetch(url, options).then(res => res.json())
            if (!token || !tutor) return reject(null)
            localStorage.setItem(tokenKey, token)
            resolve(tutor)

        } catch (error) {
            console.error(error)
            reject(null)
        }
    })
}