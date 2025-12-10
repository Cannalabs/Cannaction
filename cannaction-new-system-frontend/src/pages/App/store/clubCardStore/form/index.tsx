import React, { useEffect, useState } from 'react';
import FormModal from '../../../../../components/formModal';
import { CardForm } from './cardForm/cardForm';
import UserEntity from '../../../../../models/entities/UserEntity';
import { formatDate } from '../../../../../utils/string';
import UserService from '../../../../../services/UserService';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

export type CardFormModalProps = {
	// idCard: number;
	title: string;
	card?: UserEntity;
	modalOpen: boolean;
	handleClose: () => void;
	setCard: (card: UserEntity | undefined) => void;
	refetch: () => void;
};

export const CardFormModal: React.FC<CardFormModalProps> = ({
	setCard,
	modalOpen,
	handleClose,
	title,
	card,
	refetch,
}) => {
	const [code, setCode] = useState<string>('');
	const [date, setDate] = useState<string>(formatDate(new Date().toISOString()));
	const [storeId, setStoreId] = useState<number | undefined>(undefined);
	const [name, setName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [birthdate, setBirthdate] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	useEffect(() => {
		setCode('');
	}, [modalOpen]);

	const handleSubmit = async () => {
		if (!code) return;
		setLoading(true);
		try {
			if (!!email && !emailRegex.test(email)) {
				openSnackbar(t('marketing.addCard.enterValidEmail'), 'error');
				return;
			}
			if (card && card.id) {
				await UserService.updateClubCardUser(card.id, {
					code,
					storeId,
					name,
					lastName,
					birthdate,
					email,
					password
				});
			} else {
				await UserService.createClubCardUser({
					storeId,
					cardId: code,
					name,
					lastName,
					birthdate,
					email,
					password
				});
			}
			refetch();
			setCard(undefined);
			setCode('');
			setStoreId(undefined);
			setName('');
			setLastName('');
			setEmail('');
			handleClose();
			openSnackbar(
				`${t('marketing.clubCard.title')} ${
					card && card.id
						? t('marketing.addStore.storeUpdated')
						: t('marketing.addStore.storeCreated')
				}`,
				'success'
			);
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!card) return;
		setCode(card.code);
		setName(card.name || '');
		setLastName(card.lastName || '');
		setEmail(card.email || '');
		setStoreId(card.store?.id);
		setDate(formatDate(card.createdAt));
		setPassword('');
	}, [card]);

	return (
		<FormModal
			title={title}
			open={modalOpen}
			handleClose={handleClose}
			setCard={setCard}
			handleSubmit={handleSubmit}
			loading={loading}
		>
			<CardForm
				code={code}
				setCode={setCode}
				date={date}
				storeId={storeId}
				setStoreId={setStoreId}
				card={card}
				name={name}
				setName={setName}
				lastName={lastName}
				setLastName={setLastName}
				email={email}
				setEmail={setEmail}
				birthdate={birthdate}
				setBirthdate={setBirthdate}
				password={password}
				setPassword={setPassword}
			/>
		</FormModal>
	);
};
