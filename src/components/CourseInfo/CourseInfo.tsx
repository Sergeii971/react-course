import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getCourseInfoBy } from 'src/service/APIservice';
import { Button } from 'src/common/Button';
import {
	formatCreationDate,
	getAuthorNames,
	getCourseDuration,
} from 'src/util/CourseUtil';
import { RouterPath } from 'src/util/RouterPath';
import {
	AUTHORS_TITLE_VALUE,
	BACK_BUTTON_TEXT_VALUE,
	CREATED_DATE_TITLE_VALUE,
	DESCRIPTION_TITLE_VALUE,
	DURATION_TITLE_VALUE,
	ID_TITLE_VALUE,
	TOKEN_KEY_NAME,
} from 'src/util/CommonConstant';

import './CourseInfo.css';

export const CourseInfo: React.FC = () => {
	const navigate = useNavigate();

	if (
		localStorage.getItem(TOKEN_KEY_NAME) === '' ||
		localStorage.getItem(TOKEN_KEY_NAME) === null
	) {
		navigate(RouterPath.LOGIN);
	}

	const { courseId } = useParams();
	const courseCardData = getCourseInfoBy(courseId);

	return (
		<div className='courseInfo'>
			<div>
				<h1>{courseCardData.title}</h1>
			</div>
			<div className='courseMain'>
				<div className='courseInfoDescription'>
					<b>{DESCRIPTION_TITLE_VALUE}</b>
					<br />
					<br />
					<text>{courseCardData.description}</text>
				</div>
				<br></br>
				<div className='courseInfoData'>
					<br />
					<br />
					<text className='courseId'>
						<b>{ID_TITLE_VALUE}</b>
						{courseCardData.id}
					</text>
					<br />
					<br />
					<text>
						<b>{DURATION_TITLE_VALUE}</b>
						{getCourseDuration(courseCardData.duration)}
					</text>
					<br />
					<br />
					<text className='courseInfoAuthors'>
						<b>{AUTHORS_TITLE_VALUE}</b>
						{getAuthorNames(courseCardData.authors)}
					</text>
					<br />
					<br />
					<text>
						<b>{CREATED_DATE_TITLE_VALUE}</b>
						{formatCreationDate(courseCardData.creationDate)}
					</text>
				</div>
			</div>
			<div className='backButton'>
				<Button
					text={BACK_BUTTON_TEXT_VALUE}
					onClick={() => navigate(RouterPath.GET_COURSES)}
				/>
			</div>
		</div>
	);
};
