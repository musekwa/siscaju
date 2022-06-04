
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import goalReducer from "../features/goals/goalSlice";
import farmerReducer from '../features/farmers/farmerSlice'
import farmlandReducer from "../features/farmlands/farmlandSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    farmer: farmerReducer,
    goals: goalReducer,
    farmland: farmlandReducer,
  },
});