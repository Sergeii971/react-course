import { LoginUser } from 'src/components/Login/LoginUser.types';
import { UserDto } from 'src/service/dto/UserDto.types';
import { NewUser } from 'src/components/Registration/NewUser.types';
import { Course } from 'src/course.type';
import { Author } from 'src/components/Courses/components/CourseCard';
import { HttpRequestType } from './util/HttpRequestType';
import { ApiUrl } from './util/ApiUrl';

export const callRegisterAPI = async (newUser: NewUser) => {
	try {
		const response = await fetch(ApiUrl.REGISTER_URL, {
			method: HttpRequestType.HTTP_REQUEST_TYPE_POST,
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

export const callLoginAPI = async (loginUser: LoginUser): Promise<UserDto> => {
	try {
		const response: Response = await fetch(ApiUrl.LOGIN_URL, {
			method: HttpRequestType.HTTP_REQUEST_TYPE_POST,
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
		};
	} catch (error) {
		alert(error);
	}
};

export const getAllCourses = async (): Promise<Course[]> => {
	try {
		const response: Response = await fetch(ApiUrl.GET_ALL_COURSES_URL, {
			method: HttpRequestType.HTTP_REQUEST_TYPE_GET,
		});
		const result = await response.json();

		return result.result;
	} catch (error) {
		alert(error);
	}
};

export const getAllAuthors = async (): Promise<Author[]> => {
	try {
		const response: Response = await fetch(ApiUrl.GET_ALL_AUTHORS_URL, {
			method: HttpRequestType.HTTP_REQUEST_TYPE_GET,
		});
		const result = await response.json();

		return result.result;
	} catch (error) {
		alert(error);
	}
};
