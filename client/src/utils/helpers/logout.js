import { tokenKey } from "../config";

export const logoutTutor = () => {
    localStorage.removeItem(tokenKey);
    window.location.href = '/';
};