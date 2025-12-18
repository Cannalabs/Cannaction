import { UserTypeEnum } from '../../../models/enums/userType.enum';
import FormValues from './formValues';

const initialValues: FormValues = {
	userType: UserTypeEnum.CUSTOMER,
	name: '',
	lastName: '',
	nickname: '',
	email: '',
	languageId: undefined,
	terms: false,
	privacy: false,
	countryId: undefined,
	storeId: undefined,
	birthdate: '',
	telephone: '',
	password: '',
	confirmPassword: '',
	stateId: undefined,
	cityId: undefined,
	storeContactEmail: '',
	storeContactTelephone: '',
	storeName: '',
	address: '',
	storeAddress: '',
};

export default initialValues;
