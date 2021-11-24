import { apiUrl, tokenKey } from "../config"

export const loginWithToken = (token) => {
    const url = `${apiUrl}/tutor`
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json',
        },
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