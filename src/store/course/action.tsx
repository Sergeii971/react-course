import { CourseActionType } from './type';
import { Course } from 'src/course.type';

export interface CourseActionDataType {
	type: CourseActionType;
	payload: any;
}

export const FillCourseListAction = (courses: Course[]) => {
	return {
		type: CourseActionType.FILL_COURSE_LIST,
		payload: courses,
	};
};

export const DeleteCourseAction = (id: string) => {
	return {
		type: CourseActionType.DELETE_COURSE,
		payload: id,
	};
};

export const AddCourseAction = (course: Course) => {
	return {
		type: CourseActionType.ADD_COURSE,
		payload: course,
	};
};
