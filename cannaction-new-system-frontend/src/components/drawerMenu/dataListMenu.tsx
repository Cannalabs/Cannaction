import { UserTypeEnum } from '../../models/enums/userType.enum';
import { useTranslation } from 'react-i18next';
import {
	BsActivity,
	BsCheck2Circle,
	BsGlobe,
	BsTag,
	BsBookmark,
	BsQuestionCircle,
	BsPeople,
	BsCreditCard,
	BsPersonPlus,
	BsEnvelope,
	BsBell,
	FiRepeat,
	FiTarget,
	BsPencilSquare,
	BsPlusCircle,
	FiTable,
	BsGear,
	BsBook,
	BsDownload,
	BsFolder,
	BsCart2,
	BsArrowReturnRight,
	BsEye,
	BsPieChart,
	MdOutlineShoppingCart,
	// MdMailOutline,
	FiRefreshCcw,
	BsDatabase,
	RiKey2Line,
	BsUpload,
} from '../../themes/icons';
import { Location } from 'history';

export const useMenuItems = () => {
	const { t } = useTranslation();

	const commonMenuItems = [
		{
			label: t('marketing.dashboard.title'),
			url: 'dashboard',
			icon: <BsActivity />,
		},
		{
			label: t('marketing.promotions.title'),
			url: 'promotions',
			icon: <BsTag />,
		},
		{ label: t('marketing.Quiz.title'), url: 'quiz', icon: <BsQuestionCircle /> },
		{
			label: t('marketing.notification.title'),
			url: 'notification',
			icon: <BsBell />,
		},
	];

	const marketingMenuItems = [
		{
			label: t('marketing.promoReport.title'),
			url: 'promo-report',
			icon: <FiTable />,
		},
		{
			label: t('marketing.salesReport.title'),
			url: 'sales-report',
			icon: <FiTable />,
		},
		{
			label: t('marketing.redeemedItems.title'),
			url: 'redeemed-items',
			icon: <BsCheck2Circle />,
		},
		{
			label: t('marketing.clubCard.title'),
			url: 'club-card',
			icon: <BsCreditCard />,
		},
		{
			label: t('marketing.productsAvailable.title'),
			url: 'products-available',
			icon: <BsBookmark />,
		},
		{ label: t('marketing.Stores.title'), url: 'stores', icon: <BsGlobe /> },
		{ label: t('marketing.users.title'), url: 'users', icon: <BsPeople /> },
		{
			label: t('marketing.checkChangShop.title'),
			url: 'check-change-shop',
			icon: <FiRepeat />,
		},
		{
			label: t('marketing.profilePunctuation.title'),
			url: '/profile-punctuation',
			icon: <BsPersonPlus />,
		},
		{ label: t('marketing.targets.title'), url: 'targets', icon: <FiTarget /> },
		{ label: t('marketing.upload.title'), url: 'upload', icon: <BsUpload /> },
		{ label: 'Newsletter', url: 'newsletter', icon: <BsEnvelope /> },
	];

	const superMenuItems = [
		// { label: 'General Report', url: 'general-report', icon: <BsDatabase /> },
		// { label: 'Permissions', url: 'permissions', icon: <RiKey2Line /> },
		{ label: 'Club Card Code', url: 'club-card-code', icon: <BsCreditCard /> },
	];

	const storeMenuItems = [
		{
			label: t('menu.pointsStatement'),
			url: '/points-statement',
			icon: <BsBook />,
		},
		{
			label: t('menu.coupons'),
			url: 'coupons',
			icon: <BsCheck2Circle />,
		},
		{
			label: t('menu.customers'),
			url: '/customers',
			icon: <BsPeople />,
		},
		{
			label: t('menu.downloads'),
			url: '/downloads',
			icon: <BsDownload />,
		},
		// {
		// 	label: t('menu.clubCard'),
		// 	url: 'club-card',
		// 	icon: <BsCreditCard />,
		// },
	];

	const customerMenuItems = [
		{
			label: t('menu.exchangePoints'),
			url: 'exchange-points',
			icon: <FiRepeat />,
		},
		{
			label: t('menu.coupons'),
			url: 'coupons',
			icon: <BsCheck2Circle />,
		},
		// { label: 'Invite a Friend', url: 'invite-friend', icon: <MdMailOutline /> },
		{
			label: t('menu.changeShop'),
			url: 'change-shop',
			icon: <FiRefreshCcw />,
		},
		{
			label: t('menu.downloads'),
			url: '/downloads',
			icon: <BsDownload />,
		},
	];

	return {
		commonMenuItems,
		marketingMenuItems,
		superMenuItems,
		storeMenuItems,
		customerMenuItems,
	};
};

export const useDataListMenu = (userType?: string) => {
	const {
		commonMenuItems,
		marketingMenuItems,
		superMenuItems,
		storeMenuItems,
		customerMenuItems,
	} = useMenuItems();

	switch (userType) {
		case UserTypeEnum.MARKETING:
			return [...commonMenuItems, ...marketingMenuItems];
		case UserTypeEnum.SUPER:
			return [...superMenuItems, ...commonMenuItems, ...marketingMenuItems];
		case UserTypeEnum.STORE:
			return [...commonMenuItems, ...storeMenuItems];
		case UserTypeEnum.CUSTOMER:
		case UserTypeEnum.CLUB_CARD:
			return [...commonMenuItems, ...customerMenuItems];
		default:
			return [];
	}
};

interface RouteConfig {
	[key: string]: {
		title: string;
		subtitle: string;
		icon: JSX.Element;
	};
}

export const useRouteConfig = (location: Location) => {
	const { t } = useTranslation();
	const { pathname } = location;

	const routeConfig: RouteConfig = {
		'/dashboard': {
			title: t('marketing.dashboard.title'),
			subtitle: t('marketing.routes.dashboard.subtitle'),
			icon: <BsActivity size={28} fill="lightgrey" />,
		},

		'/downloads': {
			title: t('store.routes.downloads.title'),
			subtitle: t('store.routes.downloads.subtitle'),
			icon: <BsDownload size={28} fill="lightgrey" />,
		},
		'/detail-archives': {
			title: t('store.customers.archives.title'),
			subtitle: t('marketing.routes.archives.subtitle'),
			icon: <BsFolder size={22} fill="lightgrey" />,
		},

		'/promo-report': {
			title: t('marketing.promoReport.title'),
			subtitle: t('marketing.routes.promoReport.subtitle'),
			icon: <FiTable size={28} color="lightgrey" />,
		},

		'/sales-report': {
			title: t('marketing.salesReport.title'),
			subtitle: t('marketing.routes.salesReport.subtitle'),
			icon: <FiTable size={28} color="lightgrey" />,
		},

		'/promotions': {
			title: t('marketing.promotions.title'),
			subtitle: t('marketing.routes.promotions.subtitle'),
			icon: <BsTag size={28} fill="lightgrey" />,
		},
		'/add-promotion': {
			title: t('marketing.addPromotion.title'),
			subtitle: '',
			icon: <BsPlusCircle size={16} />,
		},
		'/edit-promotion': {
			title: t('marketing.editPromotion.title'),
			subtitle: '',
			icon: <BsPencilSquare size={16} />,
		},
		'/detail-promotion': {
			title: t('marketing.routes.promotions.detailsTitle'),
			subtitle: '',
			icon: <BsEye size={16} />,
		},

		'/redeemed-items': {
			title: t('marketing.redeemedItems.title'),
			subtitle: t('marketing.routes.redeemedItems.subtitle'),
			icon: <BsCheck2Circle size={28} fill="lightgrey" />,
		},

		'/products-available': {
			title: t('marketing.productsAvailable.title'),
			subtitle: t('marketing.routes.productsAvailable.subtitle'),
			icon: <BsBookmark size={28} fill="lightgrey" />,
		},
		'/add-item': {
			title: t('marketing.addProduct.title'),
			subtitle: '',
			icon: <BsPlusCircle size={16} />,
		},
		'/edit-item/': {
			title: t('marketing.editProduct.title'),
			subtitle: '',
			icon: <BsPencilSquare size={16} />,
		},
		'/detail-item/': {
			title: t('marketing.routes.productsAvailable.detailsTitle'),
			subtitle: '',
			icon: <BsEye size={16} />,
		},

		'/quiz': {
			title: t('marketing.Quiz.title'),
			subtitle: t('marketing.routes.quiz.subtitle'),
			icon: <BsQuestionCircle size={28} fill="lightgrey" />,
		},
		'/add-quiz': {
			title: t('marketing.addQuiz.addQuiz'),
			subtitle: '',
			icon: <BsPlusCircle size={16} />,
		},
		'/edit-quiz': {
			title: t('marketing.routes.quiz.editTitle'),
			subtitle: '',
			icon: <BsPencilSquare size={16} />,
		},
		'/view-quiz': {
			title: t('marketing.routes.quiz.detailsTitle'),
			subtitle: '',
			icon: <BsEye size={16} />,
		},
		'/reply-quiz': {
			title: t('marketing.routes.quiz.replyTitle'),
			subtitle: '',
			icon: <BsArrowReturnRight size={16} />,
		},
		'/report-quiz': {
			title: t('marketing.routes.quiz.reportTitle'),
			subtitle: '',
			icon: <BsPieChart size={16} />,
		},

		'/stores': {
			title: t('marketing.Stores.title'),
			subtitle: t('marketing.routes.stores.subtitle'),
			icon: <BsGlobe size={28} fill="lightgrey" />,
		},
		'/add-store': {
			title: t('marketing.addStore.title'),
			subtitle: '',
			icon: <BsPlusCircle size={16} />,
		},
		'/edit-store': {
			title: t('marketing.editStore.title'),
			subtitle: '',
			icon: <BsPencilSquare size={16} />,
		},
		'/detail-store': {
			title: t('marketing.routes.stores.detailsTitle'),
			subtitle: '',
			icon: <BsGlobe size={16} />,
		},
		'/store-settings': {
			title: t('marketing.storesSetting.title'),
			subtitle: '',
			icon: <BsGear size={16} />,
		},

		'/users': {
			title: t('marketing.users.title'),
			subtitle: t('marketing.routes.users.subtitle'),
			icon: <BsPeople size={18} fill="lightgrey" />,
		},
		'/add-user': {
			title: t('marketing.addUser.title'),
			subtitle: '',
			icon: <BsPlusCircle size={18} fill="lightgrey" />,
		},
		'/edit-user': {
			title: t('marketing.editUser.title'),
			subtitle: t('marketing.routes.users.subtitle'),
			icon: <BsPencilSquare size={18} fill="lightgrey" />,
		},
		'/detail-user': {
			title: t('marketing.routes.users.detailsTitle'),
			subtitle: '',
			icon: <BsEye size={16} />,
		},

		'/check-change-shop': {
			title: t('marketing.checkChangShop.title'),
			subtitle: t('marketing.routes.checkChangeShop.subtitle'),
			icon: <BsCreditCard size={32} fill="lightgrey" />,
		},

		'/club-card': {
			title: t('store.routes.clubCard.title'),
			subtitle: t('store.routes.clubCard.subtitle'),
			icon: <BsCreditCard size={32} fill="lightgrey" />,
		},

		'/profile-punctuation': {
			title: t('marketing.profilePunctuation.title'),
			subtitle: t('marketing.routes.profilePunctuation.subtitle'),
			icon: <BsCreditCard size={32} fill="lightgrey" />,
		},

		'/upload': {
			title: t('marketing.upload.title'),
			subtitle: t('marketing.routes.upload.subtitle'),
			icon: <BsUpload size={32} fill="lightgrey" />,
		},

		'/targets': {
			title: t('marketing.targets.title'),
			subtitle: t('marketing.routes.targets.subtitle'),
			icon: <FiTarget size={32} color="lightgrey" />,
		},

		'/newsletter': {
			title: t('marketing.newsletter.title'),
			subtitle: t('marketing.routes.newsletter.subtitle'),
			icon: <BsEnvelope size={32} fill="lightgrey" />,
		},

		'/add-newsletter': {
			title: t('marketing.addNewsletter.title'),
			subtitle: '',
			icon: <BsPlusCircle size={20} fill="lightgrey" />,
		},
		'/edit-newsletter': {
			title: t('marketing.editNewsletter.title'),
			subtitle: '',
			icon: <BsPencilSquare size={20} fill="lightgrey" />,
		},

		'/notification': {
			title: t('marketing.notification.title'),
			subtitle: t('marketing.routes.notification.subtitle'),
			icon: <BsBell size={32} fill="lightgrey" />,
		},
		'/add-notification': {
			title: t('marketing.addNotification.title'),
			subtitle: '',
			icon: <BsPlusCircle size={20} fill="lightgrey" />,
		},
		'/edit-notification': {
			title: t('marketing.editNotification.title'),
			subtitle: '',
			icon: <BsPencilSquare size={20} fill="lightgrey" />,
		},
		'/detail-notification': {
			title: t('marketing.routes.notification.detailsTitle'),
			subtitle: '',
			icon: <BsEye size={16} />,
		},
		'/view-detail-notification': {
			title: t('marketing.routes.notification.detailsTitle'),
			subtitle: '',
			icon: <BsEye size={16} />,
		},

		'/coupons': {
			title: t('store.routes.coupons.title'),
			subtitle: t('store.routes.coupons.subtitle'),
			icon: <BsCheck2Circle size={32} fill="lightgrey" />,
		},

		'/points-statement': {
			title: t('store.routes.pointsStatement.title'),
			subtitle: t('store.routes.pointsStatement.subtitle'),
			icon: <BsBook size={28} fill="lightgrey" />,
		},

		'/sales-points-statement': {
			title: t('store.routes.pointsStatement.title'),
			subtitle: t('marketing.routes.salesPointsStatement.subtitle'),
			icon: <FiTable size={28} color="lightgrey" />,
		},

		'/customers': {
			title: t('store.routes.customers.title'),
			subtitle: t('marketing.routes.customers.subtitle'),
			icon: <BsPeople size={28} fill="lightgrey" />,
		},
		'/add-customer': {
			title: t('marketing.addCustomer.title'),
			subtitle: '',
			icon: <BsPlusCircle size={32} fill="lightgrey" />,
		},
		'/edit-customer': {
			title: t('marketing.editCustomer.title'),
			subtitle: t('marketing.routes.customers.subtitle'),
			icon: <BsPencilSquare size={32} fill="lightgrey" />,
		},
		'/detail-customer': {
			title: t('marketing.routes.customers.detailsTitle'),
			subtitle: '',
			icon: <BsEye size={16} />,
		},
		'/sales-customer': {
			title: t('marketing.dashboard.salesTitle'),
			subtitle: '',
			icon: <BsCart2 size={16} />,
		},
		'/account-profile': {
			title: t('marketing.routes.users.detailsTitle'),
			subtitle: '',
			icon: <BsPeople size={16} />,
		},

		'/exchange-points': {
			title: t('menu.exchangePoints'),
			subtitle: t('marketing.routes.exchangePoints.subtitle'),
			icon: <BsTag size={28} fill="lightgrey" />,
		},
		'detail-exchange-points': {
			title: t('marketing.routes.exchangePoints.detailsTitle'),
			subtitle: '',
			icon: <MdOutlineShoppingCart size={16} />,
		},

		'/invite-friend': {
			title: t('marketing.inviteFriend.title'),
			subtitle: t('marketing.routes.inviteFriend.subtitle'),
			icon: <BsTag size={28} fill="lightgrey" />,
		},

		'/change-shop': {
			title: t('menu.changeShop'),
			subtitle: t('marketing.routes.changeShop.subtitle'),
			icon: <FiRefreshCcw size={32} />,
		},

		'/general-report': {
			title: t('marketing.generalReport.title'),
			subtitle: t('marketing.routes.generalReport.subtitle'),
			icon: <BsDatabase size={32} />,
		},

		'/permissions': {
			title: t('marketing.permissions.title'),
			subtitle: t('marketing.routes.permissions.subtitle'),
			icon: <RiKey2Line size={32} />,
		},
	};

	const route =
		Object.keys(routeConfig).find((key) => pathname.includes(key)) || 'default';
	return routeConfig[route];
};
