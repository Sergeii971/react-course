import React from 'react';

function formatCreationDate(creationDate: string) {
	return new Date(creationDate)
		.toLocaleDateString('en-GB')
		.replaceAll('/', '.');
}

export default formatCreationDate;
