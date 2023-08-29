import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CourseCardData } from './CourseCard.types';
import { Button } from 'src/common/Button';
import { RouterPath } from 'src/util/RouterPath';
import { COURSE_ID_REQUEST_PARAM } from 'src/util/CommonConstant';
import {
	formatCreationDate,
	getAuthorNames,
	getCourseDuration,
} from 'src/util/CourseUtil';

import './CourseCard.css';

export const CourseCard: React.FC<CourseCardData> = (courseCardData) => {
	const navigate = useNavigate();
	const showCourseInfo = (id: string) => {
		navigate(RouterPath.GET_COURSE_BY_ID.replace(COURSE_ID_REQUEST_PARAM, id));
	};
	return (
		<div id={courseCardData.id} className='courseCard' key={courseCardData.id}>
			<div className='title'>
				<h1>{courseCardData.title}</h1>
			</div>
			<div className='info'>
				<div className='description'>
					<text>{courseCardData.description}</text>
				</div>
				<br></br>
				<div className='courseData'>
					<text id='durationId'>
						<b>Duration: </b> {getCourseDuration(courseCardData.duration)}
					</text>
					<br />
					<text className='authors'>
						<b>Authors: </b> {getAuthorNames(courseCardData)}
					</text>
					<br />
					<text id='creationDate'>
						<b>Created: </b> {formatCreationDate(courseCardData.creationDate)}
					</text>
					<br />
					<Button
						id='showCourseInfoButtonId'
						text='SHOW COURSE'
						onClick={() => showCourseInfo(courseCardData.id)}
					/>
				</div>
			</div>
		</div>
	);
};
