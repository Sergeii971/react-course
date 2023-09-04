import { ApiUrl } from 'src/service/util/ApiUrl';
import { HttpRequestType } from 'src/service/util/HttpRequestType';
import {
	ADD_COURSE,
	DELETE_COURSE,
	FILL_COURSE_LIST,
	UPDATE_COURSE,
} from './reducer';
import { CommonConstant } from 'src/util/CommonConstant';
import { NewCourseDto } from 'src/service/dto/NewCourseDto';

export const getAllCourses = () => async (dispatch, getState) => {
	fetch(ApiUrl.GET_ALL_COURSES_URL, {
		method: HttpRequestType.HTTP_REQUEST_TYPE_GET,
	})
		.then((response) => response.json())
		.then((data) => {
			dispatch(FILL_COURSE_LIST(data.result));
		})
		.catch((error) => {
			alert(error.message);
		});
};

export const deleteCourse = (id: string) => async (dispatch, getState) => {
	const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);

	fetch(ApiUrl.DELETE_COURSE_URL.replace(CommonConstant.ID_REQUEST_PARAM, id), {
		method: HttpRequestType.HTTP_REQUEST_TYPE_DELETE,
		headers: {
			Authorization: token,
		},
	})
		.then(() => {
			dispatch(DELETE_COURSE(id));
		})
		.catch((error) => {
			alert(error.message);
		});
};

export const createNewCourse =
	(newCourse: NewCourseDto) => async (dispatch, getState) => {
		const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);

		fetch(ApiUrl.ADD_COURSE_URL, {
			method: HttpRequestType.HTTP_REQUEST_TYPE_POST,
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(newCourse),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.successful) {
					dispatch(ADD_COURSE(data.result));
				} else {
					alert(data.result);
				}
			})
			.catch((error) => {
				alert(error.message);
			});
	};

export const updateCourse =
	(updatedCourse: NewCourseDto, id: string) => async (dispatch, getState) => {
		const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);

		fetch(
			ApiUrl.UPDATE_COURSE_URL.replace(CommonConstant.ID_REQUEST_PARAM, id),
			{
				method: HttpRequestType.HTTP_REQUEST_TYPE_PUT,
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify(updatedCourse),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.successful) {
					dispatch(UPDATE_COURSE(data.result));
				} else {
					alert(data.result);
				}
			})
			.catch((error) => {
				alert(error.message);
			});
	};
