import i18n from '../../utils/i18n';

export enum UserTypeEnum {
	MARKETING = 'marketing',
	CUSTOMER = 'customer',
	STORE = 'store',
	DISTRIBUTOR = 'distributor',
	SUPER = 'super',
	CLUB_CARD = 'club-card',
}

export const getUserTypeText = (type: UserTypeEnum) => {
	switch (type) {
		case UserTypeEnum.CUSTOMER:
			return i18n.t('enums.userType.customer');
		case UserTypeEnum.STORE:
			return i18n.t('enums.userType.store');
		case UserTypeEnum.MARKETING:
			return i18n.t('enums.userType.marketing');
	}
};
