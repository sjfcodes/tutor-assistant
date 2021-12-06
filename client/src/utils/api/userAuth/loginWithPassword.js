import { apiUrl, tokenKey } from "../../config"

export const loginWithPassword = (inputs) => {
    const url = `${apiUrl}/tutor/login`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
    }

    return new Promise(async (resolve, reject) => {
        try {
            const { token, tutor, courses } = await fetch(url, options).then(res => res.json())
            if (!token || !tutor) return reject(null)
            localStorage.setItem(tokenKey, token)
            resolve({ tutor, courses })

        } catch (error) {
            console.error(error)
            reject(null)
        }
    })
}