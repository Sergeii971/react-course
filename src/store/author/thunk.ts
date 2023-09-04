import { ApiUrl } from 'src/service/util/ApiUrl';
import { HttpRequestType } from 'src/service/util/HttpRequestType';
import { ADD_AUTHOR, FILL_AUTHOR_LIST } from './reducer';
import { NewAuthorDto } from 'src/service/dto/NewAuthorDto';
import { CommonConstant } from 'src/util/CommonConstant';

export const getAllAuthors = () => async (dispatch, getState) => {
	fetch(ApiUrl.GET_ALL_AUTHORS_URL, {
		method: HttpRequestType.HTTP_REQUEST_TYPE_GET,
	})
		.then((response) => response.json())
		.then((data) => {
			dispatch(FILL_AUTHOR_LIST(data.result));
		})
		.catch((error) => {
			alert(error.message);
		});
};

export const createNewAuthor =
	(newAuthor: NewAuthorDto) => async (dispatch, getState) => {
		const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);

		fetch(ApiUrl.ADD_AUTHOR_URL, {
			method: HttpRequestType.HTTP_REQUEST_TYPE_POST,
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(newAuthor),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.successful) {
					dispatch(ADD_AUTHOR(data.result));
				} else {
					alert(data.result);
				}
			})
			.catch((error) => {
				alert(error.message);
			});
	};
