import * as yup from 'yup';
import { NotificationUserType } from '../../../../../models/enums/NotificationUserTypeEnum';

const schema = yup.object().shape({
	id: yup.number(),
	title: yup.string().required(),
	body: yup.string().required(),
	countryId: yup.number().required(),
	userType: yup.string().default(NotificationUserType.ALL)
});

export default schema;
