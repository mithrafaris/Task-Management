import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  messages: [],
  chatLoading: false, 
  chatError: null, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    sendMessageStart: (state) => {
      state.chatLoading = true; 
      state.error = null;
    },
    sendMessageSuccess: (state, action) => {
      state.messages.push(action.payload);
      state.chatLoading = false;
    },
    sendMessageFailure: (state, action) => {
      state.chatError = action.payload;
      state.chatLoading = false; 
    },
    getMessageStart: (state) => {
      state.chatLoading = true; 
      state.chatError = null; 
    },
    getMessageSuccess: (state, action) => {
      state.messages = action.payload;
      state.chatLoading = false; 
    },
    getMessageFailure: (state, action) => {
      state.chatError = action.payload; 
      state.chatLoading= false;
    }
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailure,
  getMessageStart,
  getMessageSuccess,
  getMessageFailure,
} = userSlice.actions;

export default userSlice.reducer;
