import { UserTypeEnum } from '../../../models/enums/userType.enum';
import FormValues from './formValues';

const initialValues: FormValues = {
	userType: UserTypeEnum.CUSTOMER,
	name: '',
	lastName: '',
	nickname: '',
	email: '',
	languageId: 1,
	terms: false,
	privacy: false,
	countryId: 2,
	storeId: 0,
	birthdate: '',
	telephone: '',
	password: '',
	confirmPassword: '',
	stateId: 1,
	cityId: undefined,
	storeContactEmail: '',
	storeContactTelephone: '',
	storeName: '',
	address: '',
	storeAddress: '',
};

export default initialValues;
