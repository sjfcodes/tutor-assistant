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


export const formatDateInput = (date) => {
    const year = date.getUTCFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month}-${day.length === 1 ? day : `0${day}`}`
}

export const getFutureDate = (date) => {
    const d = date.split('-')
    const year = d[0]
    const month = d[1]
    const day = d[2]
    console.log(year, month, day)
    return true
}

export const getFutureDateInUnix = (date) => {

    // UTC time zone - local time zone in seconds
    const timeZoneOffsetSeconds = new Date().getTimezoneOffset() * 60

    // time in seconds (unix time)
    const futureDateSeconds = new Date(date).getTime() / 1000

    // console.log(new Date(futureDateSeconds + timeZoneOffsetSeconds * 1000));

    return futureDateSeconds + timeZoneOffsetSeconds
}