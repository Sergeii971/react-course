import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Author } from 'src/components/Courses/components/CourseCard';

const INITIAL_STATE = {
	authors: [] as Author[],
};

export const authorSlice = createSlice({
	name: 'authorReducer',
	initialState: INITIAL_STATE,
	reducers: {
		FILL_AUTHOR_LIST: (state, action: PayloadAction<Author[]>) => {
			state.authors = action.payload;
		},
		ADD_AUTHOR: (state, action: PayloadAction<Author>) => {
			state.authors = state.authors.map((author) => author);
			state.authors.push(action.payload);
		},
		ADD_AUTHORS: (state, action: PayloadAction<Author[]>) => {
			state.authors = state.authors.map((author) => author);
			action.payload.forEach((author) => state.authors.push(author));
		},
	},
});

export const { FILL_AUTHOR_LIST, ADD_AUTHOR, ADD_AUTHORS } =
	authorSlice.actions;
export default authorSlice.reducer;
