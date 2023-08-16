import React from 'react';

const formatCreationDate: React.FC = (creationDate: string) => {
	return new Date(creationDate)
		.toLocaleDateString('en-GB')
		.replaceAll('/', '.');
};

export default formatCreationDate;
