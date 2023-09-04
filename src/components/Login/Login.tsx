import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from 'src/common/Input';
import { Button } from 'src/common/Button';
import { LoginUser } from './LoginUser.types';
import { callLoginAPI } from 'src/service/APIservice';
import { CommonConstant } from 'src/util/CommonConstant';
import { RouterPath } from 'src/util/RouterPath';
import { useAppDispatch } from 'src/store/hook';
import { LOGIN } from 'src/store/user/reducer';

import './Login.css';

const LOGIN_TITLE = 'Login';
const REGISTER_LINK_TEXT = 'Register';
const MARK_TEXT = "If you don't have an account you may ";
const LOGIN_BUTTON_TEXT = 'LOGIN';

export const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const login = async (event) => {
		event.preventDefault();

		const requestBody: LoginUser = {
			email: email,
			password: password,
		};

		const user = await callLoginAPI(requestBody);
		if (!user.successful) {
			alert(user.result);
		} else {
			localStorage.setItem(CommonConstant.TOKEN_KEY_NAME, user.result);
			dispatch(LOGIN(user));
		}
		navigate(RouterPath.GET_COURSES);
	};

	return (
		<div>
			<div className='login'>
				<div className='loginTitle'>
					<h1>{LOGIN_TITLE}</h1>
				</div>
				<form className='loginForm' onSubmit={login}>
					<div className='email'>
						<Input
							type={CommonConstant.INPUT_EMAIL_TYPE}
							name={CommonConstant.INPUT_EMAIL_NAME}
							value={email}
							required={true}
							labelText={CommonConstant.INPUT_EMAIL_LABEL_TEXT}
							placeholderText={CommonConstant.INPUT_EMAIL_PLACEHOLDER_TEXT}
							onChange={emailOnChange}
						/>
					</div>
					<div className='password'>
						<Input
							type={CommonConstant.INPUT_PASSWORD_TYPE}
							name={CommonConstant.INPUT_PASSWORD_NAME}
							value={password}
							required={true}
							labelText={CommonConstant.INPUT_PASSWORD_LABEL_TEXT}
							placeholderText={CommonConstant.INPUT_PASSWORD_PLACEHOLDER_TEXT}
							onChange={passwordOnChange}
						/>
					</div>
					<div className='loginButton'>
						<Button text={LOGIN_BUTTON_TEXT} />
					</div>
					<div className='mark'>
						{MARK_TEXT}
						<Link to={RouterPath.REGISTRATION} relative='path'>
							{REGISTER_LINK_TEXT}
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
