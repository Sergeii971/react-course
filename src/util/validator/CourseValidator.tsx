import { Author } from 'src/components/Courses/components/CourseCard/Author.types';
import { NewCourseDto } from 'src/service/dto/NewCourseDto';

export class CourseValidator {
	public static isNewCourseValid = (newCourse: NewCourseDto) => {
		return (
			this.isCourseTitleValid(newCourse.title) &&
			this.isCourseDescriptionValid(newCourse.description) &&
			this.isCourseDurationValid(newCourse.duration) &&
			newCourse.authors.length > 0
		);
	};

	public static isCourseTitleValid = (title: string) => {
		return title.length >= 2;
	};

	public static isCourseDescriptionValid = (description: string) => {
		return description.length >= 2;
	};

	public static isCourseDurationValid = (duration: number) => {
		return duration > 0;
	};

	public static isAuthorNameValid = (description: string) => {
		return description.length >= 2;
	};

	public static isCourseAuthorListValid = (courseAuthorList: Author[]) => {
		return courseAuthorList.length > 0;
	};
}
