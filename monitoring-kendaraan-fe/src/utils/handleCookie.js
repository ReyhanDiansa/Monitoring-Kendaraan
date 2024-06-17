import Cookies from 'js-cookie';

// Function to set the token in the cookie
export const setTokenCookie = (token) => {
  Cookies.set('nikelToken', token, { expires: 7 }); // Set the token cookie with a 7-day expiration
};

// Function to get the token from the cookie
export const getTokenCookie = () => {
  const token = Cookies.get('nikelToken');
  return token;
};

// Function to remove the token from the cookie
export const removeTokenCookie = () => {
  Cookies.remove('nikelToken');
};