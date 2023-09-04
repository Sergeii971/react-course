import { UserActionType } from './type';

export interface UserActionDataType {
	type: UserActionType;
	payload: {
		isAuth: boolean;
		name: string;
		email: string;
		token: string;
	};
}

export const LoginAction = (
	isAuth: boolean,
	name: string,
	email: string,
	token: string
) => {
	return {
		type: UserActionType.LOGIN,
		payload: {
			isAuth,
			name,
			email,
			token,
		},
	};
};

export const LogoutAction = () => {
	return {
		type: UserActionType.LOGOUT,
	};
};
