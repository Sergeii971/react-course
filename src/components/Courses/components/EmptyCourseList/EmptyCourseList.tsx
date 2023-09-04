import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/common/Button';
import { RouterPath } from 'src/util/RouterPath';

import './EmptyCourseList.css';

const EMPTY_COURSE_LIST_TITLE = 'Course List is Empty';
const EMPTY_COURSE_LIST_MESSAGE =
	'Please use "Add New Course" button to add your first course';
const ADD_NEW_COURSE_BUTTON_TEXT = 'ADD NEW COURSE';

export const EmptyCourseList: React.FC = () => {
	const navigate = useNavigate();

	const addCourseOnClick = () => {
		navigate(RouterPath.ADD_NEW_COURSE);
	};

	return (
		<div className='emptyCourseList'>
			<h1>{EMPTY_COURSE_LIST_TITLE}</h1>
			<text>{EMPTY_COURSE_LIST_MESSAGE}</text>
			<Button text={ADD_NEW_COURSE_BUTTON_TEXT} onClick={addCourseOnClick} />
		</div>
	);
};
