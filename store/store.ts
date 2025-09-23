import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slice-reducers/Formslice";
import web3reducer from "./slice-reducers/Web3slice";
import audioreducer from "./slice-reducers/AudioSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    Web3: web3reducer,
    audio: audioreducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
