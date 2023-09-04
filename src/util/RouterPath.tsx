export enum RouterPath {
	LOGIN = '/login',
	GET_COURSES = '/courses',
	REGISTRATION = '/registration',
	GET_COURSE_BY_ID = GET_COURSES + '/:courseId',
	ADD_NEW_COURSE = GET_COURSES + '/newCourse',
	UPDATE_COURSE = GET_COURSES + '/update/:courseId',
}
