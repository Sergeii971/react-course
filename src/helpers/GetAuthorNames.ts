import React from 'react';
import { CourseCardData } from 'src/components/Courses/components/CourseCard/CourseCard.types';
import { mockedAuthorsList } from 'src/constants';

function getAuthorNames(courseCardData: CourseCardData) {
	return mockedAuthorsList
		.filter((author) =>
			courseCardData.authors.map((author1) => author1.id).includes(author.id)
		)
		.map((author) => author.name)
		.join();
}

export default getAuthorNames;
