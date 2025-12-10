import React from 'react';
import { MdOutlineShoppingCart } from '../../../../themes/icons';
import { ItemEntity } from '../../../../models/entities/ItemEntity';
import img from '../../../../../public/favicon.ico';
import { useTranslation } from 'react-i18next';

interface Props {
	item: ItemEntity;
	handleNavigate: (id: number) => void;
}

export const Card: React.FC<Props> = ({ item, handleNavigate }) => {
	const {t} = useTranslation();
	
	return (
		<div className="col-xl-4 col-md-6 col-12 mb-4">
			<div className="card">
				<div className="card-header border-0">{item.name}</div>
				<img
					src={item.image ?? img}
					className="d-block w-100"
					alt="..."
					style={{ aspectRatio: '16/13', borderRadius: '5px 5px 0 0' }}
				/>
				<div className="card-footer position-relative">
					<div className="d-flex align-items-center justify-content-between small text-body">
						<a
							className="stretched-link text-body"
							onClick={() => {handleNavigate(item.id)}}
							style={{ textDecoration: 'none', cursor: 'pointer' }}
						>
							{item.points} {t('marketing.storesSetting.pointsTablePointsColumn')}
						</a>
						<MdOutlineShoppingCart
							size={16}
							style={{
								color: '#1b7f75',
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
