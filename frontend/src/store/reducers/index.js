import { combineReducers } from 'redux';
import user from './user';
import hospitalAdmin from './hospitalAdmin';
import hospital from './hospital';
import doctor from './doctor';

export default combineReducers({
  user,
  hospitalAdmin,
  hospital,
  doctor,
});
