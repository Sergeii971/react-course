import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Courses } from './Courses';
import { CourseForm } from '../CourseForm';
import { RouterPath } from '../../util/RouterPath';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		email: '',
		role: 'admin',
	},
	course: {
		courses: [
			{
				id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
				title: 'Angular',
				description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                      has been the industry's standard dummy text ever since the 1500s, when an unknown 
                      printer took a galley of type and scrambled it to make a type specimen book.`,
				creationDate: '10/11/2020',
				duration: 210,
				authors: [
					'df32994e-b23d-497c-9e4d-84e4dc02882f',
					'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
				],
			},
		],
	},
	author: {
		authors: [
			{
				id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
				name: 'Anna Sidorenko',
			},
			{
				id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
				name: 'Valentina Larina',
			},
		],
	},
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const courses = (
	<BrowserRouter>
		<Provider store={mockedStore}>
			<Routes>
				<Route
					path={RouterPath.ADD_NEW_COURSE}
					element={<CourseForm />}
				></Route>
			</Routes>
			<Courses />
		</Provider>
	</BrowserRouter>
);

test('display courses with amount of CourseCard equal length of courses array', () => {
	render(courses);
	const expected = mockedState.course.courses.length;
	const actual = mockedState.course.courses.filter((course) =>
		screen.getByTestId(course.id)
	).length;
	expect(actual).toEqual(expected);
});

test('CourseForm should be shown after a click on the "Add new course" button', () => {
	render(courses);
	const button = screen.getByTestId('addCourseButtonTestId');
	fireEvent.click(button);
	expect(screen.getByTestId('courseFormTestId')).toBeInTheDocument();
});
