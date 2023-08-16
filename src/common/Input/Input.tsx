import React from 'react';
import { InputProps } from './Input.types';

const Input: React.FC<InputProps> = (props) => {
	return (
		<div>
			<input
				placeholder={props.text}
				type={props.type}
				name={props.name}
				id={props.id}
				defaultValue={props.value}
			/>
		</div>
	);
};

export default Input;
