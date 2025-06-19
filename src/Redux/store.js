// // store.js
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
 import authSliceReducer from "./Slices/AuthSlice";
 import counterSliceReducer from "./Slices/CounterSlice";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { persistReducer, persistStore } from "redux-persist";

import { configureStore } from "@reduxjs/toolkit";

// // Step 1: Create persist config
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['counter'], // only persist the counter slice
// };

// // Step 2: Combine reducers
// const rootReducer = combineReducers({
//   auth: authSliceReducer,
//   counter: counterSliceReducer,
// });

// // Step 3: Create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Step 4: Configure store with persisted reducer
// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: true,
// });

// // Step 5: Export persistor
// export const persistor = persistStore(store);


const store = configureStore({
  reducer : {
    auth : authSliceReducer,
    counter : counterSliceReducer
  },
  devTools : true
});

export default store;