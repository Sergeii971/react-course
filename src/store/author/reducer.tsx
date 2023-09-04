import { produce } from 'immer';

import { AuthorActionType } from './type';
import { AuthorActionDataType } from './action';
import { Author } from 'src/components/Courses/components/CourseCard';

const INITIAL_STATE = {
	authors: [] as Author[],
};
export const authorReducer = (
	state = INITIAL_STATE,
	action: AuthorActionDataType
) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case AuthorActionType.FILL_AUTHOR_LIST:
				draft.authors = action.payload;
				break;
			case AuthorActionType.ADD_AUTHOR:
				draft.authors = state.authors.map((author) => author);
				draft.authors.push(action.payload);
				break;
			default:
		}
	});
};
