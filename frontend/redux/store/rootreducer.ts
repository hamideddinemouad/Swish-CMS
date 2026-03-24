
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from "@/redux/slices/userSlice"
const rootReducer = combineReducers({
  user: userReducer,     
});

export default rootReducer;