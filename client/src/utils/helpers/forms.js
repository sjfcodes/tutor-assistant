export const validateSelect = (val) => (val && val !== '---')

export const validatePassword = (pw) => pw.length >= 8

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const validateFormInputs = (formInputs) => {

    for (let value of Object.values(formInputs)) {
        // console.log(value)
        if (!value) return true
    }

    return false
}