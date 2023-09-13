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
		addUser: (state, action: PayloadAction<UserDto>) => {
			state.isAuth = true;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.token = action.payload.result;
		},
		updateUserData: (state, action: PayloadAction<CurrentUserDto>) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.role = action.payload.role;
		},
		deleteUserData: (state) => {
			state = INITIAL_STATE;
		},
	},
});

export const { addUser, deleteUserData, updateUserData } = userSlice.actions;
export default userSlice.reducer;
