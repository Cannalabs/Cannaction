import { KeyboardEvent } from 'react';

export const inputPreventSubmit = (e: KeyboardEvent) => {
	if (e.key === 'Enter') e.preventDefault();
};

export const textAreaPreventSubmit = (e: KeyboardEvent) => {
	if (e.key === 'Enter' && !e.shiftKey) e.preventDefault();
};

export const formatTime = (timeInSeconds) => {
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = timeInSeconds % 60;

	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
		2,
		'0'
	)}:${String(seconds).padStart(2, '0')}`;
};
