import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./TaskSlice.js";

export default configureStore({
  reducer: {
    coininfo: TaskReducer,
  },
});
