import React from 'react';

import { Button } from 'src/common/Button';
import { TOKEN_KEY_NAME } from 'src/util/CommonConstant';

import './EmptyCourseList.css';

export const EmptyCourseList: React.FC = () => {
	if (localStorage.getItem(TOKEN_KEY_NAME) === null) {
		return (
			<div className='emptyCourseList'>
				<h1 id='titleId'>Course List is Empty</h1>
				<text>
					You don't have permissions to create a course. Please login as ADMIN
				</text>
			</div>
		);
	} else {
		return (
			<div className='emptyCourseList'>
				<h1 id='titleId'>Course List is Empty</h1>
				<text>Please use "Add New Course" button to add your first course</text>
				<Button
					text='Add New Course'
					onClick={() => console.log('You clicked')}
					id={''}
				/>
			</div>
		);
	}
};
