import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth-reducer';
import newsReducer from './news-reducer';
import uiReducer from './ui-reducer';

import { api } from '@/services/api';

const rootReducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  news: newsReducer,
  [api.reducerPath]: api.reducer
});

export default rootReducers;
