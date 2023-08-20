import React from 'react';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = (props) => (
	<div>
		<button onClick={props.onClick}>{props.text}</button>
	</div>
);

export default Button;
