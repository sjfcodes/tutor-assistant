export const inputIsSelected = (val) => (val && val !== '-')

export const passwordIsValid = (pw) => pw.length >= 8

export const emailIsValid = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const formIsComplete = (formInputs) => {

    for (let value of Object.values(formInputs)) {
        if (typeof value === 'boolean') continue
        if (!value || value === '-') return false
    }
    return true
}