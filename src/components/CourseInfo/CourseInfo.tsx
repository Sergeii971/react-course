import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getCourseInfoBy } from 'src/service/APIservice';
import { CourseCardData } from '../Courses/components/CourseCard';
import { Button } from 'src/common/Button';
import {
	formatCreationDate,
	getAuthorNames,
	getCourseDuration,
} from 'src/util/CourseUtil';
import { RouterPath } from 'src/util/RouterPath';

import './CourseInfo.css';

export const CourseInfo: React.FC = () => {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const courseCardData: CourseCardData = getCourseInfoBy(courseId);
	return (
		<div id='courseInfoComponent' className='courseInfo'>
			<div id='courseInfoTitleId'>
				<h1>{courseCardData.title}</h1>
			</div>
			<div className='courseMain'>
				<div className='courseInfoDescription'>
					<b>Description</b>
					<br />
					<br />
					<text>{courseCardData.description}</text>
				</div>
				<br></br>
				<div className='courseInfoData'>
					<br />
					<br />
					<text className='courseId'>
						<b>ID: </b>
						{courseCardData.id}
					</text>
					<br />
					<br />
					<text id='courseInfoDurationId'>
						<b>Duration:</b>
						{getCourseDuration(courseCardData.duration)}
					</text>
					<br />
					<br />
					<text className='courseInfoAuthors'>
						<b>Authors:</b>
						{getAuthorNames(courseCardData)}
					</text>
					<br />
					<br />
					<text id='courseInfoCreationDate'>
						<b>Created:</b>
						{formatCreationDate(courseCardData.creationDate)}
					</text>
				</div>
			</div>
			<div className='backButton'>
				<Button
					text='Back'
					onClick={() => navigate(RouterPath.GET_COURSES)}
					id={'backButtonId'}
				/>
			</div>
		</div>
	);
};
