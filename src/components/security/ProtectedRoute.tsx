import { useEffect } from 'react';

import { ProtectedRouteProps } from './ProtectedRoute.types';
import { CommonConstant } from 'src/util/CommonConstant';
import { selectUser } from 'src/store/selector/UserSelector';
import { useAppDispatch, useAppSelector } from 'src/store/hook';
import { getCurrentUser } from 'src/store/user/thunk';
import { RouterPath } from 'src/util/RouterPath';
import { Navigate } from 'react-router-dom';
import { UserRole } from 'src/util/UserRole';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	component,
	roles,
}) => {
	const token = localStorage.getItem(CommonConstant.TOKEN_KEY_NAME);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCurrentUser(token));
	}, [dispatch, token]);

	const currentUser = selectUser(useAppSelector((state) => state));

	if (!token) {
		return <Navigate to={RouterPath.LOGIN} replace />;
	}
	if (currentUser.role && !roles.includes(currentUser.role)) {
		if (roles.length === 1 && roles.includes(UserRole.ADMIN)) {
			alert(CommonConstant.PERMISSION_ERROR_TEXT_MESSAGE);
		}
		return <Navigate to={RouterPath.GET_COURSES} replace />;
	}

	return component;
};
