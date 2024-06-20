import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: '',
  owner: {},
  enemy: {}
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.roomId = action.payload.roomId;
      state.owner = action.payload.owner;
      state.enemy = action.payload.enemy
    },
    setEnemy: (state, action) => {
      state.enemy = action.payload.enemy
    }
  }
});

export const { setRoom } = roomSlice.actions;
export const { setEnemy } = roomSlice.actions;

export default roomSlice.reducer;
