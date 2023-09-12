import reducer, { addCourse } from './reducer';

const INITIAL_STATE = {
	courses: [],
};

test('should return the initial state', () => {
	const expected = { courses: [] };
	expect(reducer(INITIAL_STATE, { type: undefined })).toEqual(expected);
});

test('reducer should handle addCourse and returns new state', () => {
	const newCourse = {
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
	};

	const expected = {
		courses: [newCourse],
	};
	expect(reducer(INITIAL_STATE, addCourse(newCourse))).toEqual(expected);
});
