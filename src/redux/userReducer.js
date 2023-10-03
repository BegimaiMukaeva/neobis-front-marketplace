const initialState = {
  username: '',
  email: '',
  userExists: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
      };
    case 'RESET_USER_EXISTS':
      return {
        ...state,
        userExists: false,
      };
    case 'SET_USER_EXISTS':
      return {
        ...state,
        userExists: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
