import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Logo } from './components/Logo';
import { Button } from 'src/common/Button';
import { RouterPath } from 'src/util/RouterPath';
import { logout } from 'src/util/LoginUtil';
import { RootState } from 'src/store';
import { LogoutAction } from 'src/store/user/action';

import './Header.css';

const LOGOUT_BUTTON_TEXT = 'LOGOUT';

export const Header: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const userData = useSelector((state: RootState) => state.auth);
	const userName = userData.name;

	const buttonAction = () => {
		logout();
		dispatch(LogoutAction());
		navigate(RouterPath.LOGIN);
	};
	if (
		location.pathname === RouterPath.LOGIN ||
		location.pathname === RouterPath.REGISTRATION
	) {
		return (
			<div>
				<header className='header'>
					<Logo />
				</header>
			</div>
		);
	}
	return (
		<div>
			<header className='header'>
				<Logo />
				<div className='userNameWithButton'>
					<div className='userName'>
						<b>{userName}</b>
					</div>
					<Button text={LOGOUT_BUTTON_TEXT} onClick={buttonAction} />
				</div>
			</header>
		</div>
	);
};
