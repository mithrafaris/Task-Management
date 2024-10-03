import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  isConnected: false,
  messages: [],
  error: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectSocket: (state, action) => {
      state.socket = action.payload;
      state.isConnected = true;
      state.error = null;
    },
    disconnectSocket: (state) => {
      state.socket = null;
      state.isConnected = false;
      state.error = null;
    },
    socketError: (state, action) => {
      state.error = action.payload;
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  connectSocket,
  disconnectSocket,
  socketError,
  receiveMessage,
  clearMessages,
} = socketSlice.actions;

export default socketSlice.reducer;
