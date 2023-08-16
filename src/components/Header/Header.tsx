import React from 'react';
import Logo from './components/Logo/Logo';
import Button from 'src/common/Button/Button';
import './Header.css';

const Header: React.FC = () => {
	return (
		<div>
			<header className='header'>
				<Logo />
				<Button
					text='LOGIN'
					onClick={() => console.log('You clicked on the orange circle!')}
				/>
			</header>
		</div>
	);
};

export default Header;
