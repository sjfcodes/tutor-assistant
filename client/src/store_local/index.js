export const TUTOR_AUTH_TOKEN = 'auth_token';
export const LS_SELECTED_COURSE = 'selectedCourseId';
export const LS_SELECTED_SECTION = 'selectedSection';

const LS_KEY = 'tutorly';

const getLocalStorage = () => JSON.parse(localStorage.getItem(LS_KEY)) || {};
const setLocalStorage = (object) => localStorage.setItem(LS_KEY, JSON.stringify(object));

export const updateLocalStorage = ({ key, value }) => {
  const ls = getLocalStorage();
  ls[key] = value;
  setLocalStorage(ls);
};

export const getLocalStorageValueFor = ({ key }) => {
  const ls = getLocalStorage();
  return ls[key] || null;
};

export const removeLocalStorageData = () => {
  localStorage.removeItem(LS_KEY);
};
