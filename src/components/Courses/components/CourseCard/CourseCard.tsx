import React from 'react';
import { CourseCardData } from './CourseCard.types';
import Button from 'src/common/Button/Button';
import './CourseCard.css';
import getCourseDuration from 'src/helpers/getCourseDuration';
import formatCreationDate from 'src/helpers/formatCreationDate';
import getAuthorNames from 'src/helpers/GetAuthorNames';
import CourseInfo from 'src/components/CourseInfo/CourseInfo';
import ReactDOM from 'react-dom/client';
import Header from 'src/components/Header/Header';

const CourseCard: React.FC<CourseCardData> = (courseCardData) => {
	return (
		<div id={courseCardData.id} className='courseCard'>
			<div id='titleId'>
				<h1>{courseCardData.title}</h1>
			</div>
			<div id='info'>
				<div id='descriptionId'>
					<text>{courseCardData.description}</text>
				</div>
				<br></br>
				<div id='courseData'>
					<text id='durationId'>
						<b>Duration: </b> {getCourseDuration(courseCardData.duration)}
					</text>
					<br />
					<text id='authorsId'>
						<b>Authors: </b> {getAuthorNames(courseCardData)}
					</text>
					<br />
					<text id='creationDate'>
						<b>Created: </b> {formatCreationDate(courseCardData.creationDate)}
					</text>
					<br />
					<Button
						text='SHOW COURSE'
						onClick={() => showCourseInfo(courseCardData)}
					/>
				</div>
			</div>
		</div>
	);
};

function showCourseInfo(courseCardData: CourseCardData) {
	ReactDOM.createRoot(document.getElementById('App')).render(
		<div>
			<Header />
			<CourseInfo {...courseCardData} />
		</div>
	);
}

export default CourseCard;