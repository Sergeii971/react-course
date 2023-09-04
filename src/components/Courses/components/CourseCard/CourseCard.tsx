import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/common/Button';
import { RouterPath } from 'src/util/RouterPath';
import { CommonConstant } from 'src/util/CommonConstant';
import { CourseUtil } from 'src/util/CourseUtil';
import { CourseCardProp } from './CourseCardProp.types';
import { useAppSelector } from 'src/store/hook';
import { selectAllAuthors } from 'src/store/selector/AuthorSelector';
import { selectUser } from 'src/store/selector/UserSelector';
import { UserRole } from 'src/util/UserRole';

import './CourseCard.css';

const SHOW_COURSE_INFO_BUTTON_TEXT = 'SHOW COURSE';
const EDIT_BUTTON_TEXT = 'EDIT';
const DELETE_BUTTON_TEXT = 'DELETE';

export const CourseCard: React.FC<CourseCardProp> = ({
	course,
	removeCourseOnClick,
	editOnCLick,
}) => {
	const navigate = useNavigate();
	const showCourseInfo = (id: string) => {
		navigate(
			RouterPath.GET_COURSE_BY_ID.replace(
				CommonConstant.COURSE_ID_REQUEST_PARAM,
				id
			)
		);
	};

	const authors = selectAllAuthors(useAppSelector((state) => state));
	const currentUser = selectUser(useAppSelector((state) => state));

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
						<b>{CommonConstant.DURATION_TITLE_VALUE}</b>{' '}
						{CourseUtil.getCourseDuration(course.duration)}
					</text>
					<br />
					<text className='authors'>
						<b>{CommonConstant.AUTHORS_TITLE_VALUE}</b>{' '}
						{CourseUtil.getAuthorNames(course.authors, authors)}
					</text>
					<br />
					<text>
						<b>{CommonConstant.CREATED_DATE_TITLE_VALUE}</b>{' '}
						{CourseUtil.formatCreationDate(course.creationDate)}
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
							{currentUser.role === UserRole.ADMIN && (
								<Button
									text={DELETE_BUTTON_TEXT}
									onClick={() => removeCourseOnClick(course.id)}
								/>
							)}
						</div>
						<div className='editButton'>
							{currentUser.role === UserRole.ADMIN && (
								<Button
									text={EDIT_BUTTON_TEXT}
									onClick={() => editOnCLick(course.id)}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
