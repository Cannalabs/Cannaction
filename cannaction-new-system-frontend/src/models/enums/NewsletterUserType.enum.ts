import i18n from '../../utils/i18n';

export enum NewsletterUserType {
	ALL = 'all',
	STORE = 'store',
	CUSTOMER = 'customer',
}

export const getNewsletterUserTypeText = (type: NewsletterUserType) => {
	switch (type) {
		case NewsletterUserType.CUSTOMER:
			return i18n.t('enums.newsletterUserType.customer');
		case NewsletterUserType.STORE:
			return i18n.t('enums.newsletterUserType.store');
		case NewsletterUserType.ALL:
			return i18n.t('enums.newsletterUserType.all');
	}
};
