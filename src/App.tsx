import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Header } from './components/Header';
import { Courses } from './components/Courses';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { RouterPath } from './util/RouterPath';

import { CourseInfo } from './components/CourseInfo';
import { store } from './store';
import { ProtectedRoute } from './components/security/ProtectedRoute';
import { UserRole } from './util/UserRole';
import { CourseForm } from './components/CourseForm';

import './App.css';

const App: React.FC = () => {
	return (
		<div id='App' className='App'>
			<Provider store={store} stabilityCheck='always'>
				<Header />
				<Routes>
					<Route index element={<Login />}></Route>
					<Route
						path={RouterPath.REGISTRATION}
						element={<Registration />}
					></Route>
					<Route path={RouterPath.LOGIN} element={<Login />}></Route>
					<Route
						path={RouterPath.GET_COURSES}
						element={
							<ProtectedRoute
								component={<Courses />}
								roles={[UserRole.ADMIN, UserRole.USER]}
							/>
						}
					></Route>
					<Route
						path={RouterPath.GET_COURSE_BY_ID}
						element={
							<ProtectedRoute
								component={<CourseInfo />}
								roles={[UserRole.ADMIN, UserRole.USER]}
							/>
						}
					></Route>
					<Route
						path={RouterPath.ADD_NEW_COURSE}
						element={
							<ProtectedRoute
								component={<CourseForm />}
								roles={[UserRole.ADMIN]}
							/>
						}
					></Route>
					<Route
						path={RouterPath.UPDATE_COURSE}
						element={
							<ProtectedRoute
								component={<CourseForm />}
								roles={[UserRole.ADMIN]}
							/>
						}
					></Route>
				</Routes>
			</Provider>
		</div>
	);
};

export default App;
