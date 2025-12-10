import { NewsletterUserType } from '../enums/NewsletterUserType.enum';
import CountryEntity from './CountryEntity';
import { StoreEntity } from './StoreEntity';

export default interface NewsletterEntity {
	id: number;
	title: string;
	body: string;
	footer: string;
	published: boolean;
	userType: NewsletterUserType;
	country: CountryEntity;
	stores: StoreEntity[];
	createdAt: string;
	updatedAt: string;
}
