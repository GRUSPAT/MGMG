import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: '',
  userName: '',
  email: '',
  photo: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
