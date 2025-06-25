import {configureStore} from '@reduxjs/toolkit';
//import authReducer from '../features/authSlice.js'
import rootReducer from './rootReducer.js';
import { authApi } from '@/features/api/authApi.js';

export const appStore = configureStore({
    reducer : rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
})