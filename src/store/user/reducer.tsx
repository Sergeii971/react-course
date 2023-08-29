import { produce } from 'immer';

import { UserActionType } from './type';
import { UserActionDataType } from './action';

const INITIAL_STATE = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const auth = (state = INITIAL_STATE, action: UserActionDataType) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case UserActionType.LOGIN:
				draft.isAuth = true;
				draft.name = action.payload.name;
				draft.email = action.payload.email;
				draft.token = action.payload.token;

				break;
			case UserActionType.LOGOUT:
				draft.isAuth = false;
				draft.name = '';
				draft.email = '';
				draft.token = '';
				break;
			default:
		}
	});
};
