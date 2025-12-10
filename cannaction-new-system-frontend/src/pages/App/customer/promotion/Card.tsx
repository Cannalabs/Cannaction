import { IconButton } from '@mui/material';
import React from 'react';
import imgDefault from '../../../../assets/favicon.ico';
import { MdOutlineSearch } from '../../../../themes/icons';

interface Props {
	promotionId: number;
	promotionName: string;
	promotionThumb?: string;
	handleNavigate: (id: number) => void;
}

export const CardPromotion: React.FC<Props> = ({
	promotionName, promotionThumb,
	promotionId,
	handleNavigate,
}) => {
	return (
		<div className="col-xl-4 col-md-6 col-12 mb-4">
			<div className="card">
				<img
					src={promotionThumb ?? imgDefault}
					className="d-block w-100"
					alt="..."
					style={{ aspectRatio: '16/13', borderRadius: '5px 5px 0 0' }}
				/>
				<div className="card-footer position-relative">
					<div className="d-flex align-items-center justify-content-between small text-body">
						<a
							style={{ cursor: 'pointer' }}
							className="stretched-link text-body"
							onClick={() => handleNavigate(promotionId)}
						>
							{promotionName}
						</a>
						<IconButton>
							<MdOutlineSearch />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};
