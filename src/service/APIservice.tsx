import { LoginUser } from 'src/components/Login/LoginUser.types';
import { UserDto } from 'src/service/dto/UserDto.types';
import { NewUser } from 'src/components/Registration/NewUser.types';
import { Course } from 'src/course.type';
import { Author } from 'src/components/Courses/components/CourseCard';
import { HttpRequestType } from './util/HttpRequestType';
import { ApiUrl } from './util/ApiUrl';
import { NewAuthorDto } from './dto/NewAuthorDto';
import { CommonConstant } from 'src/util/CommonConstant';
import { NewCourseDto } from './dto/NewCourseDto';

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

export const getCurrentUserAPI = async (token: string) => {
	try {
		const response: Response = await fetch(ApiUrl.GET_CURRENT_USER_URL, {
			method: HttpRequestType.HTTP_REQUEST_TYPE_GET,
			headers: {
				Authorization: token,
			},
		});
		const result = await response.json();

		return result.result;
	} catch (error) {
		alert(error);
	}
};

export const calllogoutAPI = async () => {
	try {
		const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);

		fetch(ApiUrl.LOGOUT_URL, {
			method: HttpRequestType.HTTP_REQUEST_TYPE_DELETE,
			headers: {
				Authorization: token,
			},
		});
	} catch (error) {
		alert(error);
	}
};

export const getCourses = async (): Promise<Course[]> => {
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

export const getAuthors = async (): Promise<Author[]> => {
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

export const createAuthor = async (newAuthor: NewAuthorDto) => {
	const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);

	try {
		const response = await fetch(ApiUrl.ADD_AUTHOR_URL, {
			method: HttpRequestType.HTTP_REQUEST_TYPE_POST,
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(newAuthor),
		});
		const data = await response.json();

		return data;
	} catch (error) {
		alert(error.message);
	}
};

export const deleteCourseAPI = async (id: string) => {
	const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);

	fetch(ApiUrl.DELETE_COURSE_URL.replace(CommonConstant.ID_REQUEST_PARAM, id), {
		method: HttpRequestType.HTTP_REQUEST_TYPE_DELETE,
		headers: {
			Authorization: token,
		},
	}).catch((error) => {
		alert(error.message);
	});
};

export const createCourse = async (newCourse: NewCourseDto) => {
	const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);

	try {
		const response = await fetch(ApiUrl.ADD_COURSE_URL, {
			method: HttpRequestType.HTTP_REQUEST_TYPE_POST,
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(newCourse),
		});
		const data = await response.json();

		return data;
	} catch (error) {
		alert(error.message);
	}
};

export const updateCourseAPI = async (
	updatedCourse: NewCourseDto,
	id: string
) => {
	const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);

	try {
		const response = await fetch(
			ApiUrl.UPDATE_COURSE_URL.replace(CommonConstant.ID_REQUEST_PARAM, id),
			{
				method: HttpRequestType.HTTP_REQUEST_TYPE_PUT,
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify(updatedCourse),
			}
		);
		const data = await response.json();

		return data;
	} catch (error) {
		alert(error.message);
	}
};
