import { tokenKey } from '../../config';

const logoutTutor = () => {
  localStorage.removeItem(tokenKey);
  window.location.href = '/';
};

export default logoutTutor;
