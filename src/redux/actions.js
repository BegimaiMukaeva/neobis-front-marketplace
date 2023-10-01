export const setUserData = (username, email) => ({
  type: "SET_USER_DATA",
  username,
  email,
});

export const resetUserExists = () => ({
  type: "RESET_USER_EXISTS",
});

export const setUserExists = (userExists) => ({
  type: "SET_USER_EXISTS",
  userExists,
});

