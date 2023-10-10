import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: '',
    email: '',
  },
  reducers: {
    setUserEmail: (state, action) => {
            state.email = action.payload;
    },
    setUserUsername: (state, action) => {
            state.username = action.payload;
    },
  },
});

export const { setUserEmail, setUserUsername } = userSlice.actions;
export default userSlice.reducer;
