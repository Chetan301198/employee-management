import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: { toggleForm: false, formId: undefined, deleteUser: false },
};

export const ReducerSlice = createSlice({
  name: "empapp",
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    updateAction: (state, action) => {
      state.client.formId = action.payload;
    },
    deleteAction: (state) => {
      state.client.deleteUser = !state.client.deleteUser;
    },
  },
});

export const { toggleChangeAction, updateAction, deleteAction } =
  ReducerSlice.actions;

export default ReducerSlice.reducer;
