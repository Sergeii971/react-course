import { LoginUser } from 'src/components/Login/LoginUser.types';
import { addUser, deleteUserData, updateUserData } from './reducer';
import {
	callLoginAPI,
	calllogoutAPI,
	getCurrentUserAPI,
} from 'src/service/APIservice';
import { CommonConstant } from 'src/util/CommonConstant';

export const getCurrentUser = (token: string) => async (dispatch) => {
	const user = await getCurrentUserAPI(token);
	dispatch(updateUserData(user));
};

export const logout = () => async (dispatch) => {
	calllogoutAPI();
	dispatch(deleteUserData());
	localStorage.clear();
};

export const login = (loginUser: LoginUser) => async (dispatch) => {
	const user = await callLoginAPI(loginUser);

	if (!user.successful) {
		alert(user.result);
	} else {
		localStorage.setItem(CommonConstant.TOKEN_KEY_NAME, user.result);
		dispatch(addUser(user));
	}
};
