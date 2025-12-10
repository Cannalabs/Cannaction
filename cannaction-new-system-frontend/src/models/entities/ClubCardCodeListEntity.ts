import i18n from "../../utils/i18n";


export default interface ClubCardCodeListEntity {
	id: number;
	code: string;
	validated: boolean;
}

export const getValidatedText = (status: boolean) => {
	if (status) {
		return i18n.t('enums.clubCardCodeList.validated');
	}
	return i18n.t('enums.clubCardCodeList.notValidated');
};