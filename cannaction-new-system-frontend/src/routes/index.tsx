import {
	Navigate,
	Routes as ReactRoutes,
	Route,
	useNavigate,
} from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import { LayoutLogin } from '../pages/Auth/layout';
import { SignedRoute } from './SignedRoute';
import Login from '../pages/Auth/login';
import ForgotPassword from '../pages/Auth/forgotPassword';
import { PrivateRoute } from './PrivateRoute';
import { LayoutApp } from '../pages/App/layoutApp';
import Register from '../pages/Auth/register';
import { UserTypeEnum } from '../models/enums/userType.enum';
//========== Marketing ==========//
import PromoReport from '../pages/App/marketing/promoReport/';
import Dashboard from '../pages/App/marketing/dashboard';
import Promotions from '../pages/App/marketing/promotions';
import ReedmedItems from '../pages/App/marketing/reedmedItems';
import Stores from '../pages/App/marketing/stores';
import Users from '../pages/App/marketing/users';
import Upload from '../pages/App/marketing/upload';
import Targets from '../pages/App/marketing/targets';
import ProductsAvaliable from '../pages/App/marketing/productsAvailable';
import SalesReport from '../pages/App/marketing/salesReport';
import { FormPromotion } from '../pages/App/marketing/promotions/form';
import { FormProductAvailable } from '../pages/App/marketing/productsAvailable/form';
import { Quiz } from '../pages/App/marketing/quiz';
import { FormQuiz } from '../pages/App/marketing/quiz/form';
import { FormStore } from '../pages/App/marketing/stores/form';
import { Settings } from '../pages/App/marketing/stores/settings';
import { CheckChangeShop } from '../pages/App/marketing/checkChangeShop';
import { ClubCard } from '../pages/App/marketing/clubCard';
import { ProfileScoring } from '../pages/App/marketing/profilePunctuation';
import { FormUser } from '../pages/App/marketing/users/form';
//========== Customer ==========//
//========== Store ==========//
import { PointsStatementStore } from '../pages/App/store/pointsStatementStore';
import { FormPromotionStore } from '../pages/App/store/promotions/form';
import { DashboardStore } from '../pages/App/store/dashboard';
import { PromotionsStore } from '../pages/App/store/promotions';
import SalesReportStore from '../pages/App/store/salesReport';
import CustomersStore from '../pages/App/store/customersStore';
// import { FormCustomerStore } from '../pages/App/store/customersStore/form';
import { DownloadsStore } from '../pages/App/store/download';
import { Archives } from '../pages/App/store/download/arquives';
import { CustomerSales } from '../pages/App/store/customersStore/sales';
import { CouponsStore } from '../pages/App/store/coupons';
import { FormQuizStore } from '../pages/App/store/quiz/formQuiz';
import { QuizStore } from '../pages/App/store/quiz';
import { NewsLetter } from '../pages/App/marketing/newsletter';
import { Notification } from '../pages/App/marketing/notification';
import { FormNewsletter } from '../pages/App/marketing/newsletter/form';
import { FormNotification } from '../pages/App/marketing/notification/form';
import { ProductsAvailableStore } from '../pages/App/store/productsAvailableStore';
import { FormProductAvailableStore } from '../pages/App/store/productsAvailableStore/form';
import { LayoutAction } from '../pages/App/layouts/layoutAction';
import { NotificationStore } from '../pages/App/store/notificationStore';
import { DetailNotification } from '../pages/App/store/notificationStore/DetailNotification';
import { DashboardCustomer } from '../pages/App/customer/dashboardCustomer';
import { useEffect } from 'react';
import { QuizReport } from '../pages/App/marketing/quiz/report';
import { FormAccountProfile } from '../pages/App/marketing/accountProfile/form';
import { PromotionCustomer } from '../pages/App/customer/promotion';
import { PromotionDetailCustomer } from '../pages/App/customer/promotion/Details';
import { RootLayout } from '../pages/App/layouts/layout';
import { ExchangePointsCustomer } from '../pages/App/customer/exchangePoints';
import { ExchangePointsDetails } from '../pages/App/customer/exchangePoints/ExchangePointsDetails';
import { CouponsCustomer } from '../pages/App/customer/couponsCustomer';
import { QuizCustomer } from '../pages/App/customer/quiz';
import { InviteFriend } from '../pages/App/customer/inviteFriend';
import { ChangeShopCustomer } from '../pages/App/customer/changeShop';
import { DownloadCustomer } from '../pages/App/customer/download';
import { NotificationCustomer } from '../pages/App/customer/notificationCustomer';
import { ArchivesCustomer } from '../pages/App/customer/download/arquives';
// import { ClubCardStore } from '../pages/App/store/clubCardStore';
import { GeneralReport } from '../pages/App/marketing/generalReport';
import { Permissions } from '../pages/App/marketing/permissions';
import { PointsStatementSales } from '../pages/App/store/pointsStatementStore/sales';
import { FormAccountProfileCustomer } from '../pages/App/customer/accountProfileCustomer/form';
import { ArchivesMarketing } from '../pages/App/marketing/upload/archives';
import { PrivacyPolicy } from '../pages/Auth/privacyPolicy';
import { TermsConditions } from '../pages/Auth/termsConditions';
import { ClubCardCodeList } from '../pages/App/marketing/clubcard-code-list';

export const Routes: React.FC = () => {
	const { signed, userTypeLogged } = useAuth();
	const canViewMarketing =
		userTypeLogged === UserTypeEnum.MARKETING ||
		userTypeLogged === UserTypeEnum.SUPER;
	const canViewStore = userTypeLogged === UserTypeEnum.STORE;
	const canViewCustomer =
		userTypeLogged === UserTypeEnum.CUSTOMER ||
		userTypeLogged === UserTypeEnum.CLUB_CARD;

	const history = useNavigate();

	useEffect(() => {
		const storedRoute = localStorage.getItem('currentRoute');

		if (!storedRoute) {
			history('/login');
		} else {
			history(storedRoute);
		}
	}, []);

	return (
		<ReactRoutes>
			<Route path="terms-conditions">
				<Route path="" element={<TermsConditions />} />
			</Route>
			<Route path="privacy-policy">
				<Route path="" element={<PrivacyPolicy />} />
			</Route>
			<Route element={<LayoutLogin />}>
				<Route element={<SignedRoute signed={signed} />}>
					<Route path="*" element={<Navigate to="/login" />} />
					<Route path="login">
						<Route path="" element={<Login />} />
					</Route>
					<Route path="forgot-password">
						<Route path="" element={<ForgotPassword />} />
					</Route>
					<Route path="register">
						<Route path="" element={<Register />} />
					</Route>
				</Route>
			</Route>
			<Route element={<PrivateRoute signed={signed} />}>
				<Route path="" element={<LayoutApp />}>
					<Route path="*" element={<Navigate to="/dashboard" />} />
					<>
						{canViewMarketing && (
							<>
								<Route element={<RootLayout />}>
									<Route path="dashboard" element={<Dashboard />} />
									<Route path="promo-report" element={<PromoReport />} />
									<Route path="sales-report" element={<SalesReport />} />
									<Route path="promotions" element={<Promotions />} />
									<Route path="redeemed-items" element={<ReedmedItems />} />
									<Route path="products-available" element={<ProductsAvaliable />} />
									<Route path="quiz" element={<Quiz />} />
									<Route path="stores" element={<Stores />} />
									<Route path="users" element={<Users />} />
									<Route path="club-card" element={<ClubCard />} />
									<Route path="check-change-shop" element={<CheckChangeShop />} />
									<Route path="upload" element={<Upload />} />
									<Route path="profile-punctuation" element={<ProfileScoring />} />
									<Route path="targets" element={<Targets />} />
									<Route path="newsletter" element={<NewsLetter />} />
									<Route path="notification" element={<Notification />} />
								</Route>
								<Route element={<LayoutAction />}>
									{/* Promotion */}
									{/* <Route path="detail-promotion/:id" element={<FormPromotion />} /> */}
									<Route path="add-promotion" element={<FormPromotion />} />
									<Route path="edit-promotion/:id" element={<FormPromotion />} />

									{/*Products Available */}
									<Route
										path="detail-item/:id"
										element={<FormProductAvailable isDetails={true} />}
									/>
									<Route
										path="add-item"
										element={<FormProductAvailable isDetails={false} />}
									/>
									<Route
										path="edit-item/:id"
										element={<FormProductAvailable isDetails={false} />}
									/>

									{/*Quiz  */}
									<Route path="detail-quiz/:id" element={<FormQuiz />} />
									<Route path="add-quiz" element={<FormQuiz />} />
									<Route path="edit-quiz/:id" element={<FormQuiz />} />
									<Route path="report-quiz/:id" element={<QuizReport />} />

									{/*Store  */}
									<Route
										path="detail-store/:id"
										element={<FormStore isDetails={true} />}
									/>
									<Route path="add-store" element={<FormStore isDetails={false} />} />
									<Route
										path="edit-store/:id"
										element={<FormStore isDetails={false} />}
									/>
									<Route path="store-settings/:id" element={<Settings />} />

									{/*User  */}
									<Route
										path="detail-user/:id"
										element={<FormUser isDetails={true} />}
									/>
									<Route path="add-user" element={<FormUser isDetails={false} />} />
									<Route path="edit-user/:id" element={<FormUser isDetails={false} />} />

									{/* Newsletter */}
									<Route path="edit-newsletter/:id" element={<FormNewsletter />} />
									<Route path="add-newsletter" element={<FormNewsletter />} />

									{/* Notification */}
									<Route path="detail-notification/:id" element={<FormNotification />} />
									<Route path="edit-notification/:id" element={<FormNotification />} />
									<Route path="add-notification" element={<FormNotification />} />

									{/* Account Profile */}
									<Route path="account-profile/:id" element={<FormAccountProfile />} />
									<Route path="detail-archives/:id" element={<ArchivesMarketing />} />
								</Route>
							</>
						)}
					</>

					{canViewStore && (
						<>
							<Route path="dashboard" element={<DashboardStore />} />
							<Route path="notification" element={<NotificationStore />} />

							<Route element={<RootLayout />}>
								<Route path="coupons" element={<CouponsStore />} />
								<Route path="customers" element={<CustomersStore />} />
								{/* <Route path="club-card" element={<ClubCardStore />} /> */}
								<Route path="downloads" element={<DownloadsStore />} />
								<Route path="points-statement" element={<PointsStatementStore />} />
								<Route path="promotions" element={<PromotionsStore />} />
								<Route path="products-available" element={<ProductsAvailableStore />} />
								<Route path="quiz" element={<QuizStore />} />
								<Route path="sales-report" element={<SalesReportStore />} />
							</Route>
							{/* ACTIONS */}

							{/* PointsStatement */}

							<Route element={<LayoutAction />}>
								<Route
									path="view-detail-notification/:id"
									element={<DetailNotification />}
								/>

								{/* Promotion */}
								<Route path="detail-promotion/:id" element={<FormPromotionStore />} />
								<Route path="detail-archives/:id" element={<Archives />} />

								{/* Product available */}
								<Route
									path="detail-item/:id"
									element={<FormProductAvailableStore isDetails={true} />}
								/>

								{/* Customers */}
								{/* <Route path="detail-customer/:id" element={<FormCustomerStore />} /> */}
								{/* <Route path="add-customer" element={<FormCustomerStore />} /> */}
								{/* <Route path="edit-customer/:id" element={<FormCustomerStore />} /> */}
								<Route path="sales-customer/:id" element={<CustomerSales />} />

								{/* Quiz */}
								<Route path="reply-quiz/:id" element={<FormQuizStore />} />

								{/* Account Profile */}
								<Route path="account-profile/:id" element={<FormAccountProfile />} />

								<Route
									path="sales-points-statement"
									element={<PointsStatementSales />}
								/>
							</Route>
						</>
					)}

					{canViewCustomer && (
						<>
							<Route path="dashboard" element={<DashboardCustomer />} />
							<Route element={<RootLayout />}>
								<Route path="promotions" element={<PromotionCustomer />} />
								<Route path="exchange-points" element={<ExchangePointsCustomer />} />
								<Route path="coupons" element={<CouponsCustomer />} />
								<Route path="quiz" element={<QuizCustomer />} />
								<Route path="invite-friend" element={<InviteFriend />} />
								<Route path="change-shop" element={<ChangeShopCustomer />} />
								<Route path="downloads" element={<DownloadCustomer />} />
							</Route>
							<Route path="notification" element={<NotificationCustomer />} />

							{/* ACTIONS */}
							<Route element={<LayoutAction />}>
								<Route
									path="detail-promotion/:id"
									element={<PromotionDetailCustomer />}
								/>
								<Route
									path="detail-exchange-points/:id"
									element={<ExchangePointsDetails />}
								/>
								{/* Quiz */}
								<Route path="reply-quiz/:id" element={<FormQuizStore />} />
								<Route
									path="view-detail-notification/:id"
									element={<DetailNotification />}
								/>

								{/* Archives */}
								<Route path="detail-archives/:id" element={<ArchivesCustomer />} />
								<Route
									path="account-profile/:id"
									element={<FormAccountProfileCustomer />}
								/>
							</Route>
						</>
					)}

					{userTypeLogged === UserTypeEnum.DISTRIBUTOR && <></>}
					{userTypeLogged === UserTypeEnum.SUPER && (
						<>
							<Route element={<RootLayout />}>
								<Route path="general-report" element={<GeneralReport />} />
								<Route path="club-card-code" element={<ClubCardCodeList />} />
								<Route element={<LayoutAction />}>
									<Route path="permissions" element={<Permissions />} />
								</Route>
							</Route>
						</>
					)}
				</Route>
			</Route>
		</ReactRoutes>
	);
};
