import { Author } from 'src/components/Courses/components/CourseCard/Author.types';
import { Course } from 'src/course.type';

export const isNewCourseValid = (newCourse: Course) => {
	return (
		isCourseTitleValid(newCourse.title) &&
		isCourseDescriptionValid(newCourse.description) &&
		isCourseDurationValid(newCourse.duration) &&
		newCourse.authors.length > 0
	);
};

export const isCourseTitleValid = (title: string) => {
	return title.length >= 2;
};

export const isCourseDescriptionValid = (description: string) => {
	return description.length >= 2;
};

export const isCourseDurationValid = (duration: number) => {
	return duration > 0;
};

export const isAuthorNameValid = (description: string) => {
	return description.length >= 2;
};

export const isCourseAuthorListValid = (courseAuthorList: Author[]) => {
	return courseAuthorList.length > 0;
};
