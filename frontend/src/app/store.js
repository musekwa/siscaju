
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authReducer from '../features/auth/authSlice'
import goalReducer from "../features/goals/goalSlice";
import farmerReducer from '../features/farmers/farmerSlice'
import farmlandReducer from "../features/farmlands/farmlandSlice";
import farmlandDivisionReducer from '../features/farmlandDivisions/farmlandDivisionSlice'

import { farmlandsApi } from "../features/farmlands/farmlandSlice";
import { farmersApi } from '../features/farmers/farmerSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    farmer: farmerReducer,
    goals: goalReducer,
    farmland: farmlandReducer,
    farmlandDivision: farmlandDivisionReducer,

    // RQT React Query
    [farmersApi.reducerPath]: farmersApi.reducer,
    [farmlandsApi.reducerPath]: farmlandsApi.reducer,
  },

  middleware: (getDefaultMiddleware)=>getDefaultMiddleware()
                                            .concat(farmersApi.middleware)
                                            .concat(farmlandsApi.middleware),
});

setupListeners(store.dispatch)