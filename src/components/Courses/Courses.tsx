import React from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import { buildAuthor } from './components/CourseCard/Author.types';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';
import './Courses.css';
import Button from 'src/common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import { CoursesProp } from './Courses.types';

const Courses: React.FC<CoursesProp> = (coursesProp) => {
	if (coursesProp.courses.length > 0) {
		const courseList = coursesProp.courses.map((course) => (
			<CourseCard
				id={course.id}
				title={course.title}
				description={course.description}
				creationDate={course.creationDate}
				duration={course.duration}
				authors={course.authors.map((author) => buildAuthor(author, ''))}
			/>
		));
		console.log(coursesProp.searchLineValue);
		return (
			<div id='coursesComponentId' className='courses'>
				<div className='searchBarWithAddButton'>
					<div className='searchBar'>
						<SearchBar inputValue={coursesProp.searchLineValue} />
					</div>
					<div id='addNewCourseButton' className='addButton'>
						<Button text='ADD NEW COURSE' onClick={() => console.log('')} />
					</div>
				</div>
				{courseList}
			</div>
		);
	} else {
		return (
			<div id='emptyCourseComponent'>
				<EmptyCourseList />
			</div>
		);
	}
};

export default Courses;
