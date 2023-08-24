function getCourseDuration(duration: number) {
	const minutesInHour = 60;
	const hours: number = Math.trunc(duration / minutesInHour);
	const minutes: number = duration - minutesInHour * hours;
	const hoursStringformat = hours < 10 ? `0${String(hours)}` : String(hours);
	const minutesStringFormat =
		minutes < 10 ? `0${String(minutes)}` : String(minutes);
	const timeUnit = hours == 1 ? ' hour' : ' hours';
	return (
		`${hoursStringformat}` + ':' + `${minutesStringFormat}` + `${timeUnit}`
	);
}

export default getCourseDuration;
