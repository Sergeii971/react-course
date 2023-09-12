import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CourseCard } from './components/CourseCard';
import { EmptyCourseList } from './components/EmptyCourseList';
import { Button } from 'src/common/Button';
import { SearchBar } from './components/SearchBar';
import { CommonConstant } from 'src/util/CommonConstant';
import { CourseUtil } from 'src/util/CourseUtil';
import { RouterPath } from 'src/util/RouterPath';
import { useAppDispatch, useAppSelector } from 'src/store/hook';
import { selectAllCourses } from 'src/store/selector/CourseSelector';
import { getAllAuthors } from 'src/store/author/thunk';
import { deleteCourse, getAllCourses } from 'src/store/course/thunk';

import './Courses.css';

const ADD_NEW_COURSE_BUTTON_TEXT = 'ADD NEW COURSE';
const SEARCH_NOTHING_FOUND_MESSAGE = 'Nothing Found';

export const Courses: React.FC = () => {
	const navigate = useNavigate();

	const courseList = selectAllCourses(useAppSelector((state) => state));
	const dispatch = useAppDispatch();

	const [searchValue, setSearchValue] = useState('');
	const [filteredList, setFilteredList] = useState(courseList);

	useEffect(() => {
		dispatch(getAllAuthors());
		dispatch(getAllCourses());
	}, [dispatch]);

	useEffect(() => {
		setFilteredList(courseList);
	}, [courseList]);

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
		navigate(RouterPath.ADD_NEW_COURSE);
	};

	const removeCourseOnClick = (id: string) => {
		dispatch(deleteCourse(id));
	};

	const editOnCLick = (id: string) => {
		navigate(
			RouterPath.UPDATE_COURSE.replace(
				CommonConstant.COURSE_ID_REQUEST_PARAM,
				id
			)
		);
	};

	if (filteredList.length) {
		const courseList = filteredList.map((course) => {
			const courseCardData = CourseUtil.buildCourseCardData(course);
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
