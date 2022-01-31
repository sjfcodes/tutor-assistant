/* eslint-disable class-methods-use-this */
import decode from 'jwt-decode';
import { LOCAL_STORAGE_KEY } from '../../config';

class AuthService {
  // getProfile() {
  //   return decode(this.getToken());
  // }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return !!(token && !this.isTokenExpired(token));
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If expiration time is less than the current time (in seconds),
    // the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  login(idToken) {
    localStorage.setItem(LOCAL_STORAGE_KEY, idToken);
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.location.reload();
  }
}

export default new AuthService();
