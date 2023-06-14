import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import roomReducer from '../reducers/roomSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer
  }
});

export default store;