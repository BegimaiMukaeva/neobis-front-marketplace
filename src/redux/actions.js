export const setUserData = (username, email) => ({
  type: 'SET_USER_DATA',
  payload: { username, email },
});

export const resetUserExists = () => ({
  type: 'RESET_USER_EXISTS',
});

export const setUserExists = (exists) => ({
  type: 'SET_USER_EXISTS',
  payload: exists,
});
