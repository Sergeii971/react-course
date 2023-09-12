import { NewCourseDto } from 'src/service/dto/NewCourseDto';
import {
	createCourse,
	deleteCourseAPI,
	getCourses,
	updateCourseAPI,
} from 'src/service/APIservice';
import {
	fillCourseList,
	deleteCourseFromStore,
	addCourse,
	updateStoreCourse,
} from './reducer';

export const getAllCourses = () => async (dispatch) => {
	const courses = await getCourses();
	dispatch(fillCourseList(courses));
};

export const deleteCourse = (id: string) => async (dispatch) => {
	deleteCourseAPI(id);
	dispatch(deleteCourseFromStore(id));
};

export const createNewCourse =
	(newCourse: NewCourseDto) => async (dispatch) => {
		const data = await createCourse(newCourse);
		if (data.successful) {
			dispatch(addCourse(data.result));
		} else {
			alert(data.result);
		}
	};

export const updateCourse =
	(updatedCourse: NewCourseDto, id: string) => async (dispatch) => {
		const data = await updateCourseAPI(updatedCourse, id);

		if (data.successful) {
			dispatch(updateStoreCourse(data.result));
		} else {
			alert(data.result);
		}
	};
