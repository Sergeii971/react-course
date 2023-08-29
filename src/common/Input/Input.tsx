import React from 'react';

import { InputProps } from './Input.types';

export const Input: React.FC<InputProps> = (props) => (
	<div>
		<label>
			<b>{props.labelText}</b>
		</label>
		<input
			placeholder={props.placeholderText}
			type={props.type}
			name={props.name}
			id={props.id}
			value={props.value}
			required={props.required}
			autoComplete='off'
			onChange={props.onChange}
		/>
	</div>
);
