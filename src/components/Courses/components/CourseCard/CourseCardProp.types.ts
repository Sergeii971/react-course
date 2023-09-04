import { CourseCardData } from './CourseCard.types';

export interface CourseCardProp {
	course: CourseCardData;
	removeCourseOnClick(id: string): void;
	editOnCLick(id: string): void;
}
