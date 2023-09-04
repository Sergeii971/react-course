import { Author } from 'src/components/Courses/components/CourseCard';
import { AuthorActionType } from './type';

export interface AuthorActionDataType {
	type: AuthorActionType;
	payload: any;
}

export const FillAuthorListAction = (authors: Author[]) => {
	return {
		type: AuthorActionType.FILL_AUTHOR_LIST,
		payload: authors,
	};
};

export const AddAuthorAction = (author: Author) => {
	return {
		type: AuthorActionType.ADD_AUTHOR,
		payload: author,
	};
};
