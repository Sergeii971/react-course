import React from 'react';
import Button from 'src/common/Button/Button';
import './EmptyCourseList.css';

const EmptyCourseList: React.FC = () => {
	return (
		<div className='emptyCourseList'>
			<h1 id='titleId'>Course List is Empty</h1>
			<text>Please use "Add New Course" button to add your first course</text>
			<Button
				text='Add New Course'
				onClick={() => console.log('You clicked')}
			/>
		</div>
	);
};

export default EmptyCourseList;
