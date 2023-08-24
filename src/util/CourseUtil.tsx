import { Author } from 'src/components/Courses/components/CourseCard/Author.types';
import { CourseCardData } from 'src/components/Courses/components/CourseCard';
import { mockedAuthorsList } from 'src/constants';
import { Course } from 'src/course.type';

export const buildAuthor = (id: string, name: string): Author => {
	return { id: id, name: name };
};

export const buildCourseCardData = (courses: Course): CourseCardData => {
	return {
		id: courses.id,
		title: courses.title,
		description: courses.description,
		creationDate: courses.creationDate,
		duration: courses.duration,
		authors: courses.authors.map((author) => buildAuthor(author, '')),
	};
};

export const formatCreationDate = (creationDate: string) => {
	return new Date(creationDate)
		.toLocaleDateString('en-GB')
		.replaceAll('/', '.');
};

export const getAuthorNames = (courseCardData: CourseCardData) => {
	return mockedAuthorsList
		.filter((author) =>
			courseCardData.authors.map((author1) => author1.id).includes(author.id)
		)
		.map((author) => author.name)
		.join();
};

export const getCourseDuration = (duration: number) => {
	const minutesInHour = 60;
	const hours: number = Math.trunc(duration / minutesInHour);
	const minutes: number = duration - minutesInHour * hours;
	const hoursStringformat = hours < 10 ? `0${String(hours)}` : String(hours);
	const minutesStringFormat =
		minutes < 10 ? `0${String(minutes)}` : String(minutes);
	const timeUnit = hours == 1 ? ' hour' : ' hours';
	return (
		`${hoursStringformat}` + ':' + `${minutesStringFormat}` + `${timeUnit}`
	);
};
