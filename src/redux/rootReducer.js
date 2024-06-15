import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store";

export const store = configureStore({
  reducer: rootReducer,
}); 