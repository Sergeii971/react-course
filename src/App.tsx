import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../src/components/Header';
import { Courses } from './components/Courses';
import { mockedCoursesList } from './constants';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { RouterPath } from './util/RouterPath';

import { CourseInfo } from './components/CourseInfo';
import { CreateCourse } from './components/CreateCourse';

import './App.css';

const App: React.FC = () => {
	return (
		<div id='App' className='App'>
			<Header />
			<Routes>
				<Route index element={<Courses courses={mockedCoursesList} />}></Route>
				<Route
					path={RouterPath.REGISTRATION}
					element={<Registration />}
				></Route>
				<Route path={RouterPath.LOGIN} element={<Login />}></Route>
				<Route
					path={RouterPath.GET_COURSES}
					element={<Courses courses={mockedCoursesList} />}
				></Route>
				<Route
					path={RouterPath.GET_COURSE_BY_ID}
					element={<CourseInfo />}
				></Route>
				<Route
					path={RouterPath.ADD_NEW_COURSE}
					element={<CreateCourse />}
				></Route>
			</Routes>
		</div>
	);
};

export default App;
