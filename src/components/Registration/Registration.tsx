import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from 'src/common/Button';
import { Input } from 'src/common/Input';
import { NewUser } from './NewUser.types';
import { callRegisterAPI } from 'src/service/APIservice';
import { RouterPath } from 'src/util/RouterPath';

import './Registration.css';

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
					<h1>Registration</h1>
				</div>
				<form className='registrationForm' onSubmit={signUp}>
					<div className='name'>
						<Input
							type={'text'}
							name={'name'}
							id={'nameId'}
							value={name}
							required={true}
							labelText='Name'
							placeholderText={'Input name'}
							onChange={nameOnChange}
						/>
					</div>
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
					<div className='signUpButton'>
						<Button text='SIGN UP' onClick={() => ''} id={'signUpButtonId'} />
					</div>
					<div className='mark'>
						If you have any account you may{' '}
						<Link to={RouterPath.LOGIN} relative='path'>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
