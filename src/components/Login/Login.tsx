import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from 'src/common/Input';
import { Button } from 'src/common/Button';
import { LoginUser } from './LoginUser.types';
import { callLoginAPI } from 'src/service/APIservice';
import { TOKEN_KEY_NAME, USER_NAME_KEY_NAME } from 'src/util/CommonConstant';
import { RouterPath } from 'src/util/RouterPath';
import { logout } from 'src/util/LoginUtil';

import './Login.css';

export const Login: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const emailOnChange = (event) => {
		setEmail(event.target.value);
	};

	const passwordOnChange = (event) => {
		setPassword(event.target.value);
	};

	const login = async (event) => {
		event.preventDefault();

		const user: LoginUser = {
			email: email,
			password: password,
		};

		const response = await callLoginAPI(user);
		const result = await response.json();
		if (!result.successful) {
			alert(result.result);
		} else {
			localStorage.setItem(TOKEN_KEY_NAME, result.result);
			localStorage.setItem(USER_NAME_KEY_NAME, result.user.name);
			navigate(RouterPath.GET_COURSES);
		}
	};

	logout();
	return (
		<div>
			<div className='login'>
				<div className='loginTitle'>
					<h1>Login</h1>
				</div>
				<form className='loginForm' onSubmit={login}>
					<div className='email'>
						<Input
							type={'email'}
							name={'email'}
							id={'emailId'}
							value={email}
							required={true}
							labelText={'Email'}
							placeholderText={'Input email'}
							onChange={emailOnChange}
						/>
					</div>
					<div className='password'>
						<Input
							type={'password'}
							name={'password'}
							id={'passwordId'}
							value={password}
							required={true}
							labelText={'Password'}
							placeholderText={'Input password'}
							onChange={passwordOnChange}
						/>
					</div>
					<div className='loginButton'>
						<Button text='LOGIN' onClick={() => ''} id={'loginButtonId'} />
					</div>
					<div className='mark'>
						If you don't have an account you may{' '}
						<Link to={RouterPath.REGISTRATION} relative='path'>
							Register
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
