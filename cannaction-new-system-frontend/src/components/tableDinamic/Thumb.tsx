import React from 'react';

const styledImg = {
	width: '50px',
	height: '50px',
	borderRadius: '8px',
	boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.75)',
};

interface Props {
	imageUrl?: string;
	name: string;
	defaultUrl: string;
}

export const Thumb: React.FC<Props> = ({ imageUrl, defaultUrl }) => {
	return (
		<img
			style={styledImg}
			src={`${
				imageUrl && imageUrl.trim() !== '' ? imageUrl : defaultUrl
			}?t=${new Date().getTime()}`}
			alt="Thumbnail"
		/>
	);
};
