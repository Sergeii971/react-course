import { LoginUser } from 'src/components/Login/LoginUser.types';
import { NewUser } from 'src/components/Registration/NewUser.types';
import { mockedCoursesList } from 'src/constants';
import { Course } from 'src/course.type';
import { buildCourseCardData } from 'src/util/CourseUtil';

const LOGIN_URL = 'http://localhost:4000/login';
const REGISTER_URL = 'http://localhost:4000/register';
const HTTP_REQUEST_TYPE_POST = 'POST';

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
		return response;
	} catch (error) {
		alert(error);
	}
};

export const getCourseInfoBy = (id: string) => {
	const course: Course = mockedCoursesList.find((course) => course.id === id);
	return buildCourseCardData(course);
};
