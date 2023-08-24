import React from 'react';
import Header from '../src/components/Header/Header';
import Courses from './components/Courses/Courses';
import './App.css';
import { mockedCoursesList } from './constants';

const App: React.FC = () => {
	return (
		<div id='App' className='App'>
			<Header />
			<Courses courses={mockedCoursesList} searchLineValue={''} />
		</div>
	);
};

export default App;
