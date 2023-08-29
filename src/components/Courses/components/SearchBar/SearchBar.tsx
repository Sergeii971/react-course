import React from 'react';

import { SearchBarProp } from './SearchBar.types';
import { Input } from 'src/common/Input';
import { Button } from 'src/common/Button';

import './SearchBar.css';

const SEARCH_BUTTON_TEXT = 'SEARCH';
const SEARCH_BAR_INPUT_PLACEHOLDER_TEXT = 'Search';
const SEARCH_BAR_INPUT_NAME = 'searchCourse';
const SEARCH_BAR_INPUT_TYPE = 'text';

export const SearchBar: React.FC<SearchBarProp> = (searchBarProp) => {
	return (
		<div className='searchBar'>
			<Input
				type={SEARCH_BAR_INPUT_TYPE}
				name={SEARCH_BAR_INPUT_NAME}
				value={searchBarProp.inputValue}
				placeholderText={SEARCH_BAR_INPUT_PLACEHOLDER_TEXT}
				onChange={searchBarProp.inputValueOnChange}
			/>
			<Button text={SEARCH_BUTTON_TEXT} onClick={searchBarProp.onClick} />
		</div>
	);
};
