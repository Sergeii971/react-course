import { addAuthor, fillAuthorList } from './reducer';
import { NewAuthorDto } from 'src/service/dto/NewAuthorDto';
import { createAuthor, getAuthors } from 'src/service/APIservice';

export const getAllAuthors = () => async (dispatch) => {
	const authors = await getAuthors();
	dispatch(fillAuthorList(authors));
};

export const createNewAuthor =
	(newAuthor: NewAuthorDto) => async (dispatch) => {
		const data = await createAuthor(newAuthor);
		if (data.successful) {
			dispatch(addAuthor(data.result));
		} else {
			alert(data.result);
		}
	};
