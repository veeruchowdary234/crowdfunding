import { configureStore,combineReducers} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const reducer = combineReducers({
  user: userReducer,
})
const persistConfig = { 
  key: 'root',
  storage,
  version: 1,
}
const persistreducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
  reducer: persistreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor=persistStore(store);