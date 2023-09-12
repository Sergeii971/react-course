import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Author } from 'src/components/Courses/components/CourseCard';

const INITIAL_STATE = {
	authors: [] as Author[],
};

export const authorSlice = createSlice({
	name: 'authorReducer',
	initialState: INITIAL_STATE,
	reducers: {
		fillAuthorList: (state, action: PayloadAction<Author[]>) => {
			state.authors = action.payload;
		},
		addAuthor: (state, action: PayloadAction<Author>) => {
			state.authors.push(action.payload);
		},
		addAuthors: (state, action: PayloadAction<Author[]>) => {
			action.payload.forEach((author) => state.authors.push(author));
		},
	},
});

export const { fillAuthorList, addAuthor, addAuthors } = authorSlice.actions;
export default authorSlice.reducer;
