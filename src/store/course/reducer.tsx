import { produce } from 'immer';

import { CourseActionType } from './type';
import { CourseActionDataType } from './action';
import { Course } from 'src/course.type';

const INITIAL_STATE = {
	courses: [] as Course[],
};
export const courseReducer = (
	state = INITIAL_STATE,
	action: CourseActionDataType
) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case CourseActionType.FILL_COURSE_LIST:
				draft.courses = action.payload;
				break;
			case CourseActionType.DELETE_COURSE:
				draft.courses = state.courses.filter(
					(course) => course.id !== (action.payload as string)
				);
				break;
			case CourseActionType.ADD_COURSE:
				draft.courses = state.courses.map((course) => course);
				draft.courses.push(action.payload);
				break;
			default:
		}
	});
};
