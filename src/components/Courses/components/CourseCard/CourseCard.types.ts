import { Author } from './Author.types';

export interface CourseCardData {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: Array<Author>;
}
