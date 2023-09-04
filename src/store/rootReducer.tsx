import { combineReducers } from '@reduxjs/toolkit';

import { authorSlice } from './author/reducer';
import { courseSlice } from './course/reducer';
import { userSlice } from './user/reducer';

export const rootReducer = combineReducers({
	authReducer: userSlice.reducer,
	courseReducer: courseSlice.reducer,
	authorReducer: authorSlice.reducer,
});
