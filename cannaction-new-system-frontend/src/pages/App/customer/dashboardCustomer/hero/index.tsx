import React from 'react';
import { MdArrowForward } from '../../../../../themes/icons';
import svg from '../../../../../assets/img/illustrations/statistics.svg';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../../hooks/querys/user/useUser';
import { useAuth } from '../../../../../contexts/Auth';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
	const navigate = useNavigate();
	const { userLoggedId } = useAuth();
	const { data: user } = useUser(Number(userLoggedId));
	const { t } = useTranslation();

	return (
		<div className="col-xl-8 col-md-12 col-12">
			<div className="card mb-4">
				<div className="card-body p-5">
					<div className="row align-items-center justify-content-between">
						<div className="col">
							<h2 className="text-primary">
								{t('customer.customerDashboard.welcome')},{' '}
								{user?.name
									? user.name
									: `${t('store.routes.clubCard.title')} ${user?.code}`}
								!
							</h2>
							<a
								className="btn btn-primary p-3 gap-2"
								onClick={() => navigate('/promotions')}
							>
								{t('customer.customerDashboard.generateCouponButton')}
								<MdArrowForward />
							</a>
						</div>
						<div className="col d-none d-lg-block mt-4">
							<img className="img-fluid px-xl-4 mt-xxl-n5" src={svg} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Hero;
