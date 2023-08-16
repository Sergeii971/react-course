import React from 'react';
import Input from 'src/common/Input/Input';
import Button from 'src/common/Button/Button';
import ReactDOM from 'react-dom/client';
import Courses from '../../Courses';
import { mockedCoursesList } from 'src/constants';
import { CourseArray } from 'src/course.type';
import Header from 'src/components/Header/Header';
import { SearchBarProp } from './SearchBar.types';
import './SearchBar.css';

const SearchBar: React.FC<SearchBarProp> = (searchBarProp) => {
	return (
		<div className='searchBar'>
			<Input
				type={'text'}
				name={'searchCourse'}
				id={'searchCourseId'}
				text={'Search'}
				value={searchBarProp.inputValue}
			/>
			<Button text={'SEARCH'} onClick={() => search('searchCourseId')} />
		</div>
	);
};

function search(id: string) {
	const searchLineValue: string = (
		document.getElementById(id) as HTMLInputElement
	).value;
	const filteredList: CourseArray = mockedCoursesList.filter(
		(course) =>
			course.id.toUpperCase().includes(searchLineValue.toUpperCase()) ||
			course.title.toUpperCase().includes(searchLineValue.toUpperCase())
	);
	if (filteredList.length > 0) {
		ReactDOM.createRoot(document.getElementById('App')).render(
			<div>
				<Header />
				<Courses courses={filteredList} searchLineValue={searchLineValue} />
			</div>
		);
	} else {
		alert('Nothing found');
	}
}

export default SearchBar;
