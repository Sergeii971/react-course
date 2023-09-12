export enum ApiUrl {
	BACKEND_DOMAIN = 'http://localhost:4000',
	LOGIN_URL = BACKEND_DOMAIN + '/login',
	LOGOUT_URL = BACKEND_DOMAIN + '/logout',
	REGISTER_URL = BACKEND_DOMAIN + '/register',
	GET_ALL_COURSES_URL = BACKEND_DOMAIN + '/courses/all',
	GET_ALL_AUTHORS_URL = BACKEND_DOMAIN + '/authors/all',
	GET_CURRENT_USER_URL = BACKEND_DOMAIN + '/users/me',
	DELETE_COURSE_URL = BACKEND_DOMAIN + '/courses/:id',
	ADD_COURSE_URL = BACKEND_DOMAIN + '/courses/add',
	ADD_AUTHOR_URL = BACKEND_DOMAIN + '/authors/add',
	UPDATE_COURSE_URL = BACKEND_DOMAIN + '/courses/:id',
}
