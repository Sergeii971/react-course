import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from 'src/common/Button';
import { CourseUtil } from 'src/util/CourseUtil';
import { RouterPath } from 'src/util/RouterPath';
import { CommonConstant } from 'src/util/CommonConstant';
import { useAppSelector } from 'src/store/hook';
import { selectCourseById } from 'src/store/selector/CourseSelector';

import './CourseInfo.css';
import { selectAllAuthors } from 'src/store/selector/AuthorSelector';

export const CourseInfo: React.FC = () => {
	const navigate = useNavigate();

	const authors = useAppSelector(selectAllAuthors);

	const { courseId } = useParams();
	const course = useAppSelector((state) => selectCourseById(state, courseId));

	const courseCardData = CourseUtil.buildCourseCardData(course);

	return (
		<div className='courseInfo'>
			<div>
				<h1>{courseCardData.title}</h1>
			</div>
			<div className='courseMain'>
				<div className='courseInfoDescription'>
					<b>{CommonConstant.DESCRIPTION_TITLE_VALUE}</b>
					<br />
					<br />
					<text>{courseCardData.description}</text>
				</div>
				<br></br>
				<div className='courseInfoData'>
					<br />
					<br />
					<text className='courseId'>
						<b>{CommonConstant.ID_TITLE_VALUE}</b>
						{courseCardData.id}
					</text>
					<br />
					<br />
					<text>
						<b>{CommonConstant.DURATION_TITLE_VALUE}</b>
						{CourseUtil.getCourseDuration(courseCardData.duration)}
					</text>
					<br />
					<br />
					<text className='courseInfoAuthors'>
						<b>{CommonConstant.AUTHORS_TITLE_VALUE}</b>
						{CourseUtil.getAuthorNames(courseCardData.authors, authors)}
					</text>
					<br />
					<br />
					<text>
						<b>{CommonConstant.CREATED_DATE_TITLE_VALUE}</b>
						{CourseUtil.formatCreationDate(courseCardData.creationDate)}
					</text>
				</div>
			</div>
			<div className='backButton'>
				<Button
					text={CommonConstant.BACK_BUTTON_TEXT_VALUE}
					onClick={() => navigate(RouterPath.GET_COURSES)}
				/>
			</div>
		</div>
	);
};
