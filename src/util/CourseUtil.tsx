import { Author } from 'src/components/Courses/components/CourseCard/Author.types';
import { CourseCardData } from 'src/components/Courses/components/CourseCard';
import { Course } from 'src/course.type';

export class CourseUtil {
	public static buildAuthor = (id: string, name: string): Author => {
		return { id: id, name: name };
	};

	public static buildCourseCardData = (courses: Course): CourseCardData => {
		return {
			id: courses.id,
			title: courses.title,
			description: courses.description,
			creationDate: courses.creationDate,
			duration: courses.duration,
			authors: courses.authors.map((author) => this.buildAuthor(author, '')),
		};
	};

	public static formatCreationDate = (creationDate: string) => {
		return new Date(creationDate)
			.toLocaleDateString('en-GB')
			.replaceAll('/', '.');
	};

	public static getAuthorNames = (
		authors: Author[],
		storeAuthors: Author[]
	) => {
		const AuthorNames = storeAuthors
			.filter((author) =>
				authors.map((author1) => author1.id).includes(author.id)
			)
			.map((author) => author.name)
			.join();
		return AuthorNames;
	};

	public static getAuthorsByIds = (ids: string[], storeAuthors: Author[]) => {
		return storeAuthors.filter((storeAuthor) => ids.includes(storeAuthor.id));
	};

	public static getCourseDuration = (duration: number) => {
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
}
