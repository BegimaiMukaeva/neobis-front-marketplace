const initialState = {
  username: "",
  email: "",
  userExists: false,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        username: action.username,
        email: action.email,
      };
    case "RESET_USER_EXISTS":
      return {
        ...state,
        userExists: false, // Сбрасываем userExists в false
      };
    case "SET_USER_EXISTS":
      return {
        ...state,
        userExists: action.userExists,
      };
    default:
      return state;
  }
};

export default signupReducer;
