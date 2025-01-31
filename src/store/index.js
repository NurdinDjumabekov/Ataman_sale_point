import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//// slice
import saveDataSlice from './reducers/saveDataSlice';
import mainSlice from './reducers/mainSlice';

const reducer = combineReducers({
  mainSlice,
  saveDataSlice
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['saveDataSlice']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
export { store };
