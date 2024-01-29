import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { postApi } from "entities/post/api";


export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMidleware) =>
    getDefaultMidleware().concat([postApi.middleware]),
});
setupListeners(store.dispatch);
