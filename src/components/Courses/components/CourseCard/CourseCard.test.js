import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CourseCard } from './CourseCard';
import { CourseUtil } from 'src/util/CourseUtil';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		email: '',
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

const course = CourseUtil.buildCourseCardData(mockedState.course.courses[0]);

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const courseCard = (
	<BrowserRouter>
		<Provider store={mockedStore}>
			<CourseCard course={course} />
		</Provider>
	</BrowserRouter>
);

test('load and display course title', () => {
	render(courseCard);
	expect(screen.queryByText('Angular')).toBeInTheDocument();
});

test('load and display course description', () => {
	render(courseCard);
	expect(
		screen.queryByText(
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
		)
	).toBeInTheDocument();
});

test('load and display duration in correct format', () => {
	render(courseCard);
	const expected = CourseUtil.getCourseDuration(
		mockedState.course.courses[0].duration
	);
	expect(screen.queryByText(expected)).toBeInTheDocument();
});

test('load and display author list', () => {
	render(courseCard);
	const expected = CourseUtil.getAuthorNames(
		course.authors,
		mockedState.author.authors
	);

	expect(screen.queryByText(expected)).toBeInTheDocument();
});

test('load and display creation date in correct format', () => {
	render(courseCard);
	const expected = CourseUtil.formatCreationDate(
		mockedState.course.courses[0].creationDate
	);
	expect(screen.queryByText(expected)).toBeInTheDocument();
});
