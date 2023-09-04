import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Header } from './components/Header';
import { Courses } from './components/Courses';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { RouterPath } from './util/RouterPath';

import { CourseInfo } from './components/CourseInfo';
import { CreateCourse } from './components/CreateCourse';
import { store } from './store';

import './App.css';

const App: React.FC = () => {
	return (
		<div id='App' className='App'>
			<Provider store={store} stabilityCheck='always'>
				<Header />
				<Routes>
					<Route index element={<Courses />}></Route>
					<Route
						path={RouterPath.REGISTRATION}
						element={<Registration />}
					></Route>
					<Route path={RouterPath.LOGIN} element={<Login />}></Route>
					<Route path={RouterPath.GET_COURSES} element={<Courses />}></Route>
					<Route
						path={RouterPath.GET_COURSE_BY_ID}
						element={<CourseInfo />}
					></Route>
					<Route
						path={RouterPath.ADD_NEW_COURSE}
						element={<CreateCourse />}
					></Route>
				</Routes>
			</Provider>
		</div>
	);
};

export default App;
