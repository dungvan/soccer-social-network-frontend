import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { posts } from './posts.reducer';
import { users } from './users.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  posts
});

export default rootReducer;