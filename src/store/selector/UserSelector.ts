import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './../index';

const selectAuth = (state: RootState) => state.user;

export const selectUser = createSelector([selectAuth], (users) => users);
