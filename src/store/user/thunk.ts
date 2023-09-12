import { ApiUrl } from 'src/service/util/ApiUrl';
import { HttpRequestType } from 'src/service/util/HttpRequestType';
import { LOGOUT, UPDATE_USER_DATA } from './reducer';
import { CommonConstant } from 'src/util/CommonConstant';

export const getCurrentUser = (token: string) => async (dispatch, getState) => {
	fetch(ApiUrl.GET_CURRENT_USER_URL, {
		method: HttpRequestType.HTTP_REQUEST_TYPE_GET,
		headers: {
			Authorization: token,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			dispatch(UPDATE_USER_DATA(data.result));
		})
		.catch((error) => {
			alert(error.message);
		});
};

export const logout = () => async (dispatch, getState) => {
	const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);

	fetch(ApiUrl.LOGOUT_URL, {
		method: HttpRequestType.HTTP_REQUEST_TYPE_DELETE,
		headers: {
			Authorization: token,
		},
	})
		.then(() => {
			dispatch(LOGOUT());
			localStorage.clear();
		})
		.catch((error) => {
			alert(error.message);
		});
};
