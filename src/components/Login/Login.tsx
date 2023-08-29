import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Input } from 'src/common/Input';
import { Button } from 'src/common/Button';
import { LoginUser } from './LoginUser.types';
import {
	callLoginAPI,
	getAllAuthors,
	getAllCourses,
} from 'src/service/APIservice';
import { FillAuthorListAction } from 'src/store/author/action';
import { FillCourseListAction } from 'src/store/course/action';
import {
	INPUT_EMAIL_LABEL_TEXT,
	INPUT_EMAIL_NAME,
	INPUT_EMAIL_PLACEHOLDER_TEXT,
	INPUT_EMAIL_TYPE,
	INPUT_PASSWORD_LABEL_TEXT,
	INPUT_PASSWORD_NAME,
	INPUT_PASSWORD_PLACEHOLDER_TEXT,
	INPUT_PASSWORD_TYPE,
	TOKEN_KEY_NAME,
} from 'src/util/CommonConstant';
import { RouterPath } from 'src/util/RouterPath';
import { LoginAction } from 'src/store/user/action';

import './Login.css';

const LOGIN_TITLE = 'Login';
const REGISTER_LINK_TEXT = 'Register';
const MARK_TEXT = "If you don't have an account you may ";
const LOGIN_BUTTON_TEXT = 'LOGIN';

export const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
			localStorage.setItem(TOKEN_KEY_NAME, user.result);
			dispatch(
				LoginAction(user.successful, user.name, user.email, user.result)
			);

			getAllAuthors().then((authors) => {
				dispatch(FillAuthorListAction(authors));
			});
			getAllCourses().then((courses) => {
				dispatch(FillCourseListAction(courses));
			});
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
							type={INPUT_EMAIL_TYPE}
							name={INPUT_EMAIL_NAME}
							value={email}
							required={true}
							labelText={INPUT_EMAIL_LABEL_TEXT}
							placeholderText={INPUT_EMAIL_PLACEHOLDER_TEXT}
							onChange={emailOnChange}
						/>
					</div>
					<div className='password'>
						<Input
							type={INPUT_PASSWORD_TYPE}
							name={INPUT_PASSWORD_NAME}
							value={password}
							required={true}
							labelText={INPUT_PASSWORD_LABEL_TEXT}
							placeholderText={INPUT_PASSWORD_PLACEHOLDER_TEXT}
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
