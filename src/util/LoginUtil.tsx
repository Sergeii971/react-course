import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from './RouterPath';
import { TOKEN_KEY_NAME } from './CommonConstant';

export const checkLogIn = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (localStorage.getItem(TOKEN_KEY_NAME) === null) {
			navigate(RouterPath.LOGIN);
		}
	}, []);
};

export const logout = () => {
	localStorage.clear();
};
