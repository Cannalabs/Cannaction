import * as yup from 'yup';
import { NewsletterUserType } from '../../../../../models/enums/NewsletterUserType.enum';

const schema = yup.object().shape({
	id: yup.number(),
	title: yup.string().required(),
	body: yup.string().required(),
	footer: yup.string().required(),
	countryId: yup.number().required(),
	userType: yup.string().default(NewsletterUserType.ALL)
});

export default schema;
