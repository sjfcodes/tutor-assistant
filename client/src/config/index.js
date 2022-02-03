const TUTORLY_LOCALHOST = 'http://localhost:3001';
const EMAIL_TEMPLATE_LOCALHOST = 'http://localhost:3002';

export const BASE_URL_API = (
  `${process.env.REACT_APP_DEPLOYED_URL || TUTORLY_LOCALHOST}/api`
);

export const BASE_URL = (
  process.env.REACT_APP_DEPLOYED_URL
    || TUTORLY_LOCALHOST
);

export const EMAIL_TEMPLATE_APP = (
  process.env.REACT_APP_EMAIL_TEMPLATE_APP
    || EMAIL_TEMPLATE_LOCALHOST
);
console.log(EMAIL_TEMPLATE_APP);

export const LOCAL_STORAGE_KEY = 'tutor-token';
