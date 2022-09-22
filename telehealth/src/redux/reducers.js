import { combineReducers } from 'redux';
import loginReducer from './features/auth/loginSlice';
import isLoggedReducer from './features/auth/isLoggedSlice';
import getProfileReducer from './features/profile/profileSlice';

export default combineReducers({
  login: loginReducer,
  isLogged: isLoggedReducer,
  getProfile: getProfileReducer,
});
