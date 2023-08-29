import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Logo } from './components/Logo';
import { Button } from 'src/common/Button';
import { TOKEN_KEY_NAME, USER_NAME_KEY_NAME } from 'src/util/CommonConstant';
import { RouterPath } from 'src/util/RouterPath';
import { logout } from 'src/util/LoginUtil';

import './Header.css';

export const Header: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const token = localStorage.getItem(TOKEN_KEY_NAME);
	const userName = localStorage.getItem(USER_NAME_KEY_NAME);
	const buttonText = token === null ? 'LOGIN' : 'LOGOUT';

	const buttonAction = () => {
		if (token !== null) {
			logout();
			navigate(RouterPath.GET_COURSES);
		} else {
			navigate(RouterPath.LOGIN);
		}
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
		<div className='userNameWithButton'>
			<header className='header'>
				<Logo />
				<div className='userNameWithButtton'>
					<div className='userName'>
						<b>{userName}</b>
					</div>
					<Button
						id='headerLoginButtonId'
						text={buttonText}
						onClick={buttonAction}
					/>
				</div>
			</header>
		</div>
	);
};
