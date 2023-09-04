import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Course } from 'src/course.type';

const INITIAL_STATE = {
	courses: [] as Course[],
};

export const courseSlice = createSlice({
	name: 'courseReducer',
	initialState: INITIAL_STATE,
	reducers: {
		FILL_COURSE_LIST: (state, action: PayloadAction<Course[]>) => {
			state.courses = action.payload;
		},
		DELETE_COURSE: (state, action: PayloadAction<string>) => {
			state.courses = state.courses.filter(
				(course) => course.id !== (action.payload as string)
			);
		},
		ADD_COURSE: (state, action: PayloadAction<Course>) => {
			state.courses = state.courses.map((course) => course);
			state.courses.push(action.payload);
		},
		UPDATE_COURSE: (state, action: PayloadAction<Course>) => {
			state.courses = state.courses.filter(
				(course) => course.id !== action.payload.id
			);
			state.courses.push(action.payload);
		},
	},
});

export const { FILL_COURSE_LIST, DELETE_COURSE, ADD_COURSE, UPDATE_COURSE } =
	courseSlice.actions;
export default courseSlice.reducer;
