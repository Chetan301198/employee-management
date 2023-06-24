import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import listenerMiddleware from "./middleware";
import Reducer from "./reducer";

// const empId = (state) => (next) => (action) => {
//   console.log("Middleware");
// };

export const store = configureStore({
  reducer: {
    app: Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
