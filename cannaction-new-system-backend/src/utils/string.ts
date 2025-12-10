export const getLastDayOfMonth = (year: number, month: number) => {
	return new Date(year, month + 1, 0).getDate();
}

export const getRandomColor = () => {
	const chars = '0123456789'.split('');
	let color = '#';
	for (let i = 0; i < 6; i++) {
		const randomChar = Math.floor(Math.random() * chars.length);
		color += chars[randomChar];
	}
	return color;
};

export const formatDateToYearMonth = (dateString: string) => {
	const [year, month] = dateString.split('-');
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const monthIndex = parseInt(month, 10) - 1;
	return `${year}/${monthNames[monthIndex]}`;
};