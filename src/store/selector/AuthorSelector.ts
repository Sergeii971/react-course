import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './../index';

const selectAuthors = (state: RootState) => state.author.authors;

export const selectAllAuthors = createSelector(
	[selectAuthors],
	(authors) => authors
);
