import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/common/Button';
import { RouterPath } from 'src/util/RouterPath';
import {
	AUTHORS_TITLE_VALUE,
	COURSE_ID_REQUEST_PARAM,
	CREATED_DATE_TITLE_VALUE,
	DURATION_TITLE_VALUE,
} from 'src/util/CommonConstant';
import {
	formatCreationDate,
	getAuthorNames,
	getCourseDuration,
} from 'src/util/CourseUtil';
import { CourseCardProp } from './CourseCardProp.types';

import './CourseCard.css';

const SHOW_COURSE_INFO_BUTTON_TEXT = 'SHOW COURSE';
const EDIT_BUTTON_TEXT = 'EDIT';
const DELETE_BUTTON_TEXT = 'DELETE';

export const CourseCard: React.FC<CourseCardProp> = ({
	course,
	removeCourseOnClick,
}) => {
	const navigate = useNavigate();
	const showCourseInfo = (id: string) => {
		navigate(RouterPath.GET_COURSE_BY_ID.replace(COURSE_ID_REQUEST_PARAM, id));
	};

	return (
		<div className='courseCard' key={course.id}>
			<div className='title'>
				<h1>{course.title}</h1>
			</div>
			<div className='info'>
				<div className='description'>
					<text>{course.description}</text>
				</div>
				<br></br>
				<div className='courseData'>
					<text>
						<b>{DURATION_TITLE_VALUE}</b> {getCourseDuration(course.duration)}
					</text>
					<br />
					<text className='authors'>
						<b>{AUTHORS_TITLE_VALUE}</b> {getAuthorNames(course.authors)}
					</text>
					<br />
					<text>
						<b>{CREATED_DATE_TITLE_VALUE}</b>{' '}
						{formatCreationDate(course.creationDate)}
					</text>
					<br />
					<div className='actionButtons'>
						<div className='showCourseInfoButton'>
							<Button
								text={SHOW_COURSE_INFO_BUTTON_TEXT}
								onClick={() => showCourseInfo(course.id)}
							/>
						</div>
						<div className='deleteButton'>
							<Button
								text={DELETE_BUTTON_TEXT}
								onClick={() => removeCourseOnClick(course.id)}
							/>
						</div>
						<div className='editButton'>
							<Button
								text={EDIT_BUTTON_TEXT}
								onClick={() => showCourseInfo(course.id)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
