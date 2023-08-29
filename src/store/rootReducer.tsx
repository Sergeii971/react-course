import { combineReducers } from 'redux';

import { auth } from './user/reducer';
import { courseReducer } from './course/reducer';
import { authorReducer } from './author/reducer';

export const rootReducer = combineReducers({
	auth,
	courseReducer,
	authorReducer,
});
