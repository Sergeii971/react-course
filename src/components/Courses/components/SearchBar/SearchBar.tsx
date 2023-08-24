import React from 'react';

import { SearchBarProp } from './SearchBar.types';
import { Input } from 'src/common/Input';
import { Button } from 'src/common/Button';

import './SearchBar.css';

export const SearchBar: React.FC<SearchBarProp> = (searchBarProp) => {
	return (
		<div className='searchBar'>
			<Input
				type={'text'}
				name={'searchCourse'}
				id={'searchCourseId'}
				value={searchBarProp.inputValue}
				required={false}
				labelText={''}
				placeholderText={'Search'}
				onChange={searchBarProp.inputValueOnChange}
			/>
			<Button
				text={'SEARCH'}
				onClick={searchBarProp.onClick}
				id={'searchButtonId'}
			/>
		</div>
	);
};
