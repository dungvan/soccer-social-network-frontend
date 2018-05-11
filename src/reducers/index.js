import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { posts } from './posts.reducer';
import { users } from './users.reducer';
import { teams } from './teams.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  posts,
  teams,
  alert
});

export default rootReducer;