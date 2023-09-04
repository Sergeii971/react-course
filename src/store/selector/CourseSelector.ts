import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './../index';

const selectCourses = (state: RootState) => state.courseReducer.courses;
export const selectCourseById = (state: RootState, id: string) =>
	state.courseReducer.courses.find((course) => course.id === id);

export const selectAllCourses = createSelector(
	[selectCourses],
	(courses) => courses
);
