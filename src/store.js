import { configureStore } from "@reduxjs/toolkit";

import OnePostReducer from "./reducers/onePostReducer";
import OneReelReducer from "./reducers/oneReelReducer";

const store = configureStore({
  reducer: {
    OnePostReducer,
    OneReelReducer,
  },
});

export default store;
