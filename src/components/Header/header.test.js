import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './Header';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		email: '',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const header = (
	<BrowserRouter>
		<Provider store={mockedStore}>
			<Header />
		</Provider>
	</BrowserRouter>
);

test("load and display user's name", () => {
	render(header);
	expect(screen.queryByText('Test Name')).toBeInTheDocument();
});

test('load and display login button', () => {
	render(header);
	expect(screen.getByTestId('logoutButtonTestId')).toBeInTheDocument();
});

test('load and display logo', () => {
	render(header);
	expect(screen.getByTestId('logo')).toBeInTheDocument();
});
