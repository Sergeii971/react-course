import { Author } from 'src/components/Courses/components/CourseCard';

export interface AuthorItemProp {
	author: Author;
	onClickRemove: () => void;
	onClickAdd: () => void;
	isCourseAuthor: boolean;
}
