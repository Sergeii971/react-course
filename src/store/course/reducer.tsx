import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Course } from 'src/course.type';

const INITIAL_STATE = {
	courses: [] as Course[],
};

export const courseSlice = createSlice({
	name: 'courseReducer',
	initialState: INITIAL_STATE,
	reducers: {
		fillCourseList: (state, action: PayloadAction<Course[]>) => {
			state.courses = action.payload;
		},
		deleteCourseFromStore: (state, action: PayloadAction<string>) => {
			state.courses = state.courses.filter(
				(course) => course.id !== (action.payload as string)
			);
		},
		addCourse: (state, action: PayloadAction<Course>) => {
			state.courses.push(action.payload);
		},
		updateStoreCourse: (state, action: PayloadAction<Course>) => {
			state.courses = state.courses.filter(
				(course) => course.id !== action.payload.id
			);
			state.courses.push(action.payload);
		},
	},
});

export const {
	fillCourseList,
	deleteCourseFromStore,
	addCourse,
	updateStoreCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
