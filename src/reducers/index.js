import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { posts } from './posts.reducer';
import { users } from './users.reducer';
import { teams } from './teams.reducer';
import { matches } from './matches.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  posts,
  teams,
  alert,
  matches
});

export default rootReducer;