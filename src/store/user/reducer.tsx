import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserType } from './User.types';
import { UserDto } from 'src/service/dto/UserDto.types';
import { CurrentUserDto } from 'src/service/dto/CurrentUserDto';

const INITIAL_STATE: UserType = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userSlice = createSlice({
	name: 'authReducer',
	initialState: INITIAL_STATE,
	reducers: {
		LOGIN: (state, action: PayloadAction<UserDto>) => {
			state.isAuth = true;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.token = action.payload.result;
		},
		UPDATE_USER_DATA: (state, action: PayloadAction<CurrentUserDto>) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.role = action.payload.role;
		},
		LOGOUT: (state) => {
			state.isAuth = false;
			state.name = '';
			state.email = '';
			state.token = '';
			state.role = '';
		},
	},
});

export const { LOGIN, LOGOUT, UPDATE_USER_DATA } = userSlice.actions;
export default userSlice.reducer;
