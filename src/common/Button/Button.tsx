import React from 'react';

import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
	id,
	text,
	onClick,
	testId,
}) => (
	<div>
		<button id={id} onClick={onClick} data-testId={testId}>
			{text}
		</button>
	</div>
);
