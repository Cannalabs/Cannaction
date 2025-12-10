import { Grid, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import img from '../../../../../../../../public/favicon.ico';

interface Props {
	image: string;
	loading: boolean;
}

const defaultImage = img;

export const ThumbContainer: React.FC<Props> = ({ image, loading }) => {
	const [selectedImage, setSelectedImage] = useState<string>();

	useEffect(() => {
		if (image) {
			setSelectedImage(image); 
		} else {
			setSelectedImage(defaultImage);
		}
	}, [image]);

	return (
		<Grid
			container
			justifyContent="space-between"
			bgcolor={'#FFFFFF'}
			borderRadius={'8px'}
			boxShadow="0.15rem 0 1.75rem 0 rgba(33, 40, 50, 0.15)"
			height={200}
		>
			<Grid container alignItems="center" justifyContent={'center'} p={2}>
				{loading ? (
					<Skeleton variant="rectangular" width={210} height={118} />
				) : (
					<Grid container justifyContent="center" alignItems="center">
						<img
							src={selectedImage}
							alt="Selected"
							style={{
								maxHeight: '100px',
								maxWidth: '100%',
								borderRadius: '8px',
								boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.75)',
							}}
						/>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};
