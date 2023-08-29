import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CourseCard } from './components/CourseCard';
import { EmptyCourseList } from './components/EmptyCourseList';
import { Button } from 'src/common/Button';
import { SearchBar } from './components/SearchBar';
import {
	PERMISSION_ERROR_TEXT_MESSAGE,
	TOKEN_KEY_NAME,
} from 'src/util/CommonConstant';
import { buildCourseCardData } from 'src/util/CourseUtil';
import { RouterPath } from 'src/util/RouterPath';
import { RootState } from 'src/store';
import { DeleteCourseAction } from 'src/store/course/action';

import './Courses.css';

const ADD_NEW_COURSE_BUTTON_TEXT = 'ADD NEW COURSE';
const SEARCH_NOTHING_FOUND_MESSAGE = 'Nothing Found';

export const Courses: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	if (
		localStorage.getItem(TOKEN_KEY_NAME) === '' ||
		localStorage.getItem(TOKEN_KEY_NAME) === null
	) {
		navigate(RouterPath.LOGIN);
	}

	const courseList = useSelector(
		(state: RootState) => state.courseReducer.courses
	);

	const [searchValue, setSearchValue] = useState('');
	const [filteredList, setFilteredList] = useState(courseList);

	useEffect(() => {
		setFilteredList(courseList);
	});

	const searchValueOnChange = (event) => {
		setSearchValue(event.target.value);
	};

	const search = () => {
		const filteredList = courseList.filter(
			(course) =>
				course.id.toUpperCase().includes(searchValue.toUpperCase()) ||
				course.title.toUpperCase().includes(searchValue.toUpperCase())
		);
		if (filteredList.length > 0) {
			setFilteredList(filteredList);
		} else {
			alert(SEARCH_NOTHING_FOUND_MESSAGE);
		}
	};

	const addCourseOnClick = () => {
		//add role check in module 4
		if (localStorage.getItem(TOKEN_KEY_NAME) === null) {
			alert(PERMISSION_ERROR_TEXT_MESSAGE);
		} else {
			navigate(RouterPath.ADD_NEW_COURSE);
		}
	};

	const removeCourseOnClick = (id: string) => {
		dispatch(DeleteCourseAction(id));
	};

	const editOnCLick = (id: string) => {
		console.log('');
	};

	if (filteredList.length > 0) {
		const courseList = filteredList.map((course) => {
			const courseCardData = buildCourseCardData(course);
			return (
				<CourseCard
					course={{ ...courseCardData }}
					removeCourseOnClick={removeCourseOnClick}
					editOnCLick={editOnCLick}
				/>
			);
		});

		return (
			<div className='courses'>
				<div className='searchBarWithAddButton'>
					<div className='searchBar'>
						<SearchBar
							inputValue={searchValue}
							inputValueOnChange={searchValueOnChange}
							onClick={search}
						/>
					</div>
					<div className='addButton'>
						<Button
							text={ADD_NEW_COURSE_BUTTON_TEXT}
							onClick={addCourseOnClick}
						/>
					</div>
				</div>
				{courseList}
				<br />
			</div>
		);
	} else {
		return (
			<div>
				<EmptyCourseList />
			</div>
		);
	}
};
