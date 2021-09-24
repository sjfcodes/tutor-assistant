const loginBtn = $('#login')
const loginForm = $('#login-form')
const signupForm = $('#signup-form')

const baseUrl = 'http://localhost:3001/api'
const tutorLogin = `${baseUrl}/tutor/login`


const getValuesFromInputs = (formEl) => {
    const inputs = formEl.find('input')
    const values = {}
    for (const [key, val] of Object.entries(inputs)) {
        const { ariaLabel, value } = val
        if (ariaLabel)
            values[ariaLabel] = value
    }
    return values
}


const handleLogin = (e) => {
    e.preventDefault()

    const config = {
        method: 'post',
        url: tutorLogin,
        data: getValuesFromInputs(loginForm)
    }

    axios(config)
        .then(({ data }) => {
            console.log(data)
        })
        .catch(error => console.error(error))
}

loginBtn.click(handleLogin)