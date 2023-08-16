import React from 'react';

function getCourseDuration(duration: number) {
	const result = '';
	const minutesInHour = 60;
	const hours: number = Math.trunc(duration / minutesInHour);
	const minutes: number = duration - minutesInHour * hours;
	return (
		(hours < 10 ? '0' + String(hours) : String(hours)) +
		':' +
		(minutes < 10 ? '0' + String(minutes) : String(minutes)) +
		(hours == 1 ? ' hour' : ' hours')
	);
}

export default getCourseDuration;
