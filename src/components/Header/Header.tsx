import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Logo } from './components/Logo';
import { Button } from 'src/common/Button';
import { RouterPath } from 'src/util/RouterPath';
import { useAppDispatch, useAppSelector } from 'src/store/hook';
import { selectUser } from 'src/store/selector/UserSelector';
import { logout } from 'src/store/user/thunk';

import './Header.css';

const LOGOUT_BUTTON_TEXT = 'LOGOUT';

export const Header: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();
	const userData = selectUser(useAppSelector((state) => state));
	const userName = userData.name;

	const buttonAction = () => {
		dispatch(logout());
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
