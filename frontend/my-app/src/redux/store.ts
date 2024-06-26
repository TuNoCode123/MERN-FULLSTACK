import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./reducer/reducer-login";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { excuteUser } from "./reducer/reducer-excuteUser";
const authPersistConfig = {
  key: "auth",
  storage,
};
const persistedReducer = persistReducer(authPersistConfig, loginSlice.reducer);
export const store = configureStore({
  reducer: {
    login: persistedReducer,
    tableUser: excuteUser.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
