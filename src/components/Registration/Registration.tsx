import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from 'src/common/Button';
import { Input } from 'src/common/Input';
import { NewUser } from './NewUser.types';
import { callRegisterAPI } from 'src/service/APIservice';
import { RouterPath } from 'src/util/RouterPath';
import {
	INPUT_EMAIL_LABEL_TEXT,
	INPUT_EMAIL_NAME,
	INPUT_EMAIL_PLACEHOLDER_TEXT,
	INPUT_EMAIL_TYPE,
	INPUT_NAME_LABEL_TEXT,
	INPUT_NAME_NAME,
	INPUT_NAME_PLACEHOLDER_TEXT,
	INPUT_NAME_TYPE,
	INPUT_PASSWORD_LABEL_TEXT,
	INPUT_PASSWORD_NAME,
	INPUT_PASSWORD_PLACEHOLDER_TEXT,
	INPUT_PASSWORD_TYPE,
} from 'src/util/CommonConstant';

import './Registration.css';

const REGISTRATION_TITLE = 'Registration';
const REGISTRATION_BUTTON_TEXT = 'SIGN UP';
const MARK_TEXT = 'If you have any account you may ';

export const Registration: React.FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const signUp = async (event) => {
		event.preventDefault();
		const newUser: NewUser = {
			name: name,
			email: email,
			password: password,
		};
		const response = await callRegisterAPI(newUser);
		const result = await response.json();
		if (!result.successful) {
			alert(result.errors);
		} else {
			navigate(RouterPath.LOGIN);
		}
	};

	const nameOnChange = (event) => {
		setName(event.target.value);
	};

	const emailOnChange = (event) => {
		setEmail(event.target.value);
	};

	const passwordOnChange = (event) => {
		setPassword(event.target.value);
	};

	return (
		<div>
			<div className='registration'>
				<div className='registrationTitle'>
					<h1>{REGISTRATION_TITLE}</h1>
				</div>
				<form className='registrationForm' onSubmit={signUp}>
					<div className='name'>
						<Input
							type={INPUT_NAME_TYPE}
							name={INPUT_NAME_NAME}
							value={name}
							required={true}
							labelText={INPUT_NAME_LABEL_TEXT}
							placeholderText={INPUT_NAME_PLACEHOLDER_TEXT}
							onChange={nameOnChange}
						/>
					</div>
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
					<div className='signUpButton'>
						<Button text={REGISTRATION_BUTTON_TEXT} />
					</div>
					<div className='mark'>
						{MARK_TEXT}
						<Link to={RouterPath.LOGIN} relative='path'>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
