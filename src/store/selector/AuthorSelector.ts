import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './../index';

const selectAuthors = (state: RootState) => state.authorReducer.authors;

export const selectAllAuthors = createSelector(
	[selectAuthors],
	(authors) => authors
);
