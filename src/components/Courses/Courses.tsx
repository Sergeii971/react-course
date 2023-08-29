import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CourseCard } from './components/CourseCard';
import { EmptyCourseList } from './components/EmptyCourseList';
import { Button } from 'src/common/Button';
import { SearchBar } from './components/SearchBar';
import { CoursesProp } from './Courses.types';
import { TOKEN_KEY_NAME } from 'src/util/CommonConstant';
import { buildCourseCardData } from 'src/util/CourseUtil';
import { RouterPath } from 'src/util/RouterPath';

import './Courses.css';

export const Courses: React.FC<CoursesProp> = (coursesProp) => {
	const navigate = useNavigate();
	const [courses, setCourses] = useState(coursesProp.courses);
	const [searchValue, setSearchValue] = useState('');
	const [filteredList, setFilteredList] = useState(coursesProp.courses);

	const searchValueOnChange = (event) => {
		setSearchValue(event.target.value);
	};

	const search = () => {
		const filteredList = courses.filter(
			(course) =>
				course.id.toUpperCase().includes(searchValue.toUpperCase()) ||
				course.title.toUpperCase().includes(searchValue.toUpperCase())
		);
		setFilteredList(filteredList);
	};

	if (filteredList.length > 0) {
		const courseList = filteredList.map((course) => (
			<CourseCard {...buildCourseCardData(course)} />
		));
		if (localStorage.getItem(TOKEN_KEY_NAME) === null) {
			return (
				<div id='coursesComponentId' className='courses'>
					<div className='searchBarWithAddButton'>
						<div className='searchBar'>
							<SearchBar
								inputValue={searchValue}
								inputValueOnChange={searchValueOnChange}
								onClick={search}
							/>
						</div>
						<div
							id='permissionDeniedMessageID'
							className='permissionDeniedMessage'
						>
							<text>
								You don't have permissions to create <br /> a course. Please log
								in as ADMIN
							</text>
						</div>
					</div>
					{courseList}
					<br />
				</div>
			);
		} else {
			return (
				<div id='coursesComponentId' className='courses'>
					<div className='searchBarWithAddButton'>
						<div className='searchBar'>
							<SearchBar
								inputValue={searchValue}
								inputValueOnChange={searchValueOnChange}
								onClick={search}
							/>
						</div>
						<div id='addNewCourseButton' className='addButton'>
							<Button
								text='ADD NEW COURSE'
								onClick={() => navigate(RouterPath.ADD_NEW_COURSE)}
								id={'addNewCourseButtonId'}
							/>
						</div>
					</div>
					{courseList}
					<br />
				</div>
			);
		}
	} else {
		return (
			<div id='emptyCourseComponent'>
				<EmptyCourseList />
			</div>
		);
	}
};
