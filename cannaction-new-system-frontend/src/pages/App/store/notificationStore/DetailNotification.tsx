import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { FaChevronLeft } from '../../../../themes/icons';
import { useNotification } from '../../../../hooks/querys/notification/useNotification';

export const DetailNotification: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data, refetch } = useNotification(id as unknown as number);

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container-xl px-4 mt-4">
			<div className="card mb-4">
				<div className="card-header d-flex align-items-center">
					<IconButton onClick={() => navigate(-1)}>
						<FaChevronLeft size={22} />
					</IconButton>
					<div className="ms-3">
						<h2 className="my-3">{data?.title}</h2>
					</div>
				</div>
				<div className="card-body">
					<div
						className="lead"
						dangerouslySetInnerHTML={{ __html: data?.body ? data.body : '' }}
					/>
				</div>
			</div>
		</div>
	);
};
