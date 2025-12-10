import { useAuth } from '../../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import FormValues from './formValues';

export const useHandleInitialValues = () => {
	const { userTypeLogged, userCountry } = useAuth();

	const initialValues: FormValues = {
		id: undefined,
		name: '',
		lastName: '',
		email: '',
		nickname: '',
		countryId:
			userTypeLogged === UserTypeEnum.MARKETING ? userCountry : undefined,
		storeId: undefined,
		role: UserTypeEnum.STORE,
		newsLetter: false,
		password: '',
		profilePic: '',
	};

	return { initialValues };
};
