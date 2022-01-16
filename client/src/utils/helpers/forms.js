export const inputIsSelected = (val) => (val && val !== '-');

export const passwordIsValid = (pw) => pw.length >= 8;

export const emailIsValid = (email) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

export const convertStrToBool = (str) => (str === 'true');

export const missingFormInputs = (formInputs) => {
  let missingValue = false;
  Object.values(formInputs).forEach((value) => {
    if (typeof value === 'boolean') return '';
    if (!value || value === '-') missingValue = true;

    return '';
  });

  return missingValue;
};

export const getTextareaRows = (text = '') => {
  const numOfNewLines = text?.match(/\n/g);
  if (numOfNewLines) return numOfNewLines.length + 2;
  return 3;
};
