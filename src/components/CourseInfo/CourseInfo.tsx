import React from 'react';
import Button from 'src/common/Button/Button';
import './CourseInfo.css';
import getCourseDuration from 'src/helpers/getCourseDuration';
import getAuthorNames from 'src/helpers/GetAuthorNames';
import formatCreationDate from 'src/helpers/formatCreationDate';
import { CourseCardData } from '../Courses/components/CourseCard/CourseCard.types';
import ReactDOM from 'react-dom/client';
import Courses from '../Courses/Courses';
import Header from '../Header/Header';
import { mockedCoursesList } from 'src/constants';

const CourseInfo: React.FC<CourseCardData> = (
	courseCardData: CourseCardData
) => {
	return (
		<div id='courseInfoComponent' className='courseInfo'>
			<div id='courseInfoTitleId'>
				<h1>{courseCardData.title}</h1>
			</div>
			<div id='courseInfo'>
				<div id='courseInfoDescriptionId'>
					<b>Description</b>
					<br />
					<br />
					<text>{courseCardData.description}</text>
				</div>
				<br></br>
				<div id='courseInfoData'>
					<br />
					<br />
					<text id='courseId'>
						<b>ID: </b>
						{courseCardData.id}
					</text>
					<br />
					<br />
					<text id='courseInfoDurationId'>
						<b>Duration:</b> {getCourseDuration(courseCardData.duration)}
					</text>
					<br />
					<br />
					<text id='courseInfoAuthorsId'>
						<b>Authors:</b> {getAuthorNames(courseCardData)}
					</text>
					<br />
					<br />
					<text id='courseInfoCreationDate'>
						<b>Created:</b> {formatCreationDate(courseCardData.creationDate)}
					</text>
				</div>
			</div>
			<div id='backButton'>
				<Button text='Back' onClick={() => showCourses()} />
			</div>
		</div>
	);
};

function showCourses() {
	ReactDOM.createRoot(document.getElementById('App')).render(
		<React.StrictMode>
			<Header />
			<Courses courses={mockedCoursesList} searchLineValue={''} />
		</React.StrictMode>
	);
}

export default CourseInfo;
