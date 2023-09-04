import { useSelector } from 'react-redux';

import { LoginUser } from 'src/components/Login/LoginUser.types';
import { UserDto } from 'src/service/dto/UserDto.types';
import { NewUser } from 'src/components/Registration/NewUser.types';
import { Course } from 'src/course.type';
import { buildCourseCardData } from 'src/util/CourseUtil';
import { Author } from 'src/components/Courses/components/CourseCard';
import { RootState } from 'src/store';

const BACKEND_DOMAIN = 'http://localhost:4000';
const LOGIN_URL = BACKEND_DOMAIN + '/login';
const REGISTER_URL = BACKEND_DOMAIN + '/register';
const GET_ALL_COURSES_URL = BACKEND_DOMAIN + '/courses/all';
const GET_ALL_AUTHORS_URL = BACKEND_DOMAIN + '/authors/all';
const HTTP_REQUEST_TYPE_POST = 'POST';
const HTTP_REQUEST_TYPE_GET = 'GET';

export const callRegisterAPI = async (newUser: NewUser) => {
	try {
		const response = await fetch(REGISTER_URL, {
			method: HTTP_REQUEST_TYPE_POST,
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response;
	} catch (error) {
		alert(error);
	}
};

export const callLoginAPI = async (loginUser: LoginUser) => {
	try {
		const response: Response = await fetch(LOGIN_URL, {
			method: HTTP_REQUEST_TYPE_POST,
			body: JSON.stringify(loginUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();

		return {
			successful: result.successful,
			result: result.result,
			email: result.user.email,
			name: result.user.name,
		} as UserDto;
	} catch (error) {
		alert(error);
	}
};

export const getAllCourses = async () => {
	try {
		const response: Response = await fetch(GET_ALL_COURSES_URL, {
			method: HTTP_REQUEST_TYPE_GET,
		});
		const result = await response.json();

		return Promise.resolve(result.result as Course[]);
	} catch (error) {
		alert(error);
	}
};

export const getAllAuthors = async () => {
	try {
		const response: Response = await fetch(GET_ALL_AUTHORS_URL, {
			method: HTTP_REQUEST_TYPE_GET,
		});
		const result = await response.json();
		return result.result as Author[];
	} catch (error) {
		alert(error);
	}
};

export const getCourseInfoBy = (id: string) => {
	const course: Course = useSelector(
		(state: RootState) => state.courseReducer.courses
	).find((course) => course.id === id);
	return buildCourseCardData(course);
};
