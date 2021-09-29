const loginBtn = $('#login-btn')
const signupBtn = $('#signup-btn')
const logoutBtn = $('#logout-btn')
const loginForm = $('#login-form')
const signupForm = $('#signup-form')
const addStudentBtn = $('#add-student-btn')
const addSessionBtn = $('#add-session-btn')
const tutorInfoContainer = $('#tutor-info-container')

// make sure the `baseUrl` in the front-end matches the `PORT` for the server
const baseUrl = 'http://localhost:3001/api'


const toggleForm = () => {
    loginForm.toggleClass('d-none')
    signupForm.toggleClass('d-none')
}

// get key value pairs directly from the form input elements
const getValuesFromFormInputs = (formEl) => {
    const object = {}
    const addToObject = (input) => {
        for (const [key, value] of Object.entries(input)) {
            if (value.ariaLabel) object[value.ariaLabel] = value.value
        }
    }
    const inputs = formEl.find('input')
    if (inputs) addToObject(inputs)
    const selects = formEl.find('select')
    if (selects) addToObject(selects)
    if (object.sessionCount) object.sessionCount = parseInt(object.sessionCount)
    return object
}

// stash access token
const setToken = (token) => localStorage.setItem('token', token)

// hide an element
const hide = (el) => el.addClass('d-none')

// display an element
const display = (el) => el.removeClass('d-none')

const testTemplate = (data) => {
    data.map(({ template, templateValues }) => {
        const parsedArr = JSON.parse(templateValues.split("'").join('"'))
        parsedArr.map((value, idx) => template = template.replace(`{{${idx}}}`, value))
        console.log(template)
    })
}


// display tutors data
const displayTutorData = (data) => {
    for (const [key, value] of Object.entries(data)) {
        if (value && typeof value === 'object') {
            tutorInfoContainer.append('<hr/>')
            tutorInfoContainer.append(`<p><strong>${key}</strong></p>`)
            const ulEl = $('<ul>')
            if (key === 'courses') {
                value.map(item => ulEl.append(`<li>${item}</li>`))
            }
            if (key === 'students') {
                value.map((student, idx) => {
                    for (const [key, value] of Object.entries(student)) {
                        ulEl.append(`<li>${key}: ${value}</li>`)
                    }
                    ulEl.append('<hr/>')
                })
            }
            if (key === 'sessions') {
                value.map((session, idx) => {
                    for (const [key, value] of Object.entries(session)) {
                        ulEl.append(`<li>${key}: ${value}</li>`)
                    }
                    ulEl.append('<hr/>')
                })
            }
            tutorInfoContainer.append(ulEl)
        } else {
            tutorInfoContainer.append(`<p>${key}: ${value}</p>`)
        }
    }
}
const loadUserData = (data) => {
    hide(loginBtn)
    hide(loginForm)
    hide(signupBtn)
    hide(signupForm)
    display(logoutBtn)
    display(addStudentBtn)
    display(addSessionBtn)
    setToken(data.token)
    displayTutorData(data.tutor)
}
const handleLoginError = (error) => {
    logoutTutor()
    console.error(error)
}
const createNewTutor = (e) => {
    e.preventDefault()
    axios.post(`${baseUrl}/tutor`, getValuesFromFormInputs(signupForm))
        .then(({ data }) => loadUserData(data))
        .catch(error => handleLoginError(error))
}
const loginWithEmailAndPassword = () => {
    axios.post(`${baseUrl}/tutor/login`, getValuesFromFormInputs(loginForm))
        .then(({ data }) => loadUserData(data))
        .catch(error => handleLoginError(error))
}
const loginWithToken = (token) => {
    axios.get(`${baseUrl}/tutor`, { headers: { "Authorization": `bearer ${token}` } })
        .then(({ data }) => loadUserData(data))
        .catch(error => handleLoginError(error))
}

const getTemplates = (token) => {
    axios.get(`${baseUrl}/template`, { headers: { "Authorization": `bearer ${token}` } })
        .then(({ data }) => testTemplate(data))
        .catch(error => console.error(error))
}

const logoutTutor = () => {
    localStorage.removeItem('token')
    tutorInfoContainer.empty()
    hide(logoutBtn)
    display(loginBtn)
    display(signupBtn)
    display(loginForm)
}

const handleAddStudent = () => {

}

const initializePage = () => {
    const token = localStorage.getItem('token')
    if (token) {
        loginWithToken(token)
        getTemplates(token)
        display(logoutBtn)
    } else {
        display(loginBtn)
        display(signupBtn)
    }
}
initializePage()

signupForm.on('submit', createNewTutor)
signupBtn.click(toggleForm)
logoutBtn.click(logoutTutor)
loginBtn.click((e) => {
    e.preventDefault()
    loginWithEmailAndPassword()
})

addStudentBtn.click(handleAddStudent)