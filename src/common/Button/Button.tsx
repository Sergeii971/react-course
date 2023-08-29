import React from 'react';

import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = (props) => (
	<div>
		<button id={props.id} onClick={props.onClick}>
			{props.text}
		</button>
	</div>
);
