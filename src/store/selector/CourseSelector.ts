import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './../index';

const selectCourses = (state: RootState) => state.course.courses;

export const selectCourseById = createSelector(
	[selectCourses, (_, id: string) => id],
	(courses, id) => courses.find((course) => course.id === id)
);

export const selectAllCourses = createSelector(
	[selectCourses],
	(courses) => courses
);
