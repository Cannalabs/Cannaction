import { createContext, ReactNode, useContext, useState } from 'react';

import { getErrorDetails } from '../../utils/error';
import ModalError from '../../components/modals/modalError';
import ModalConfirm from '../../components/modals/modalConfirm';

type ErrorOptions = {
	title?: string | false;
	onClose?: () => void;
};

type ConfirmationOptions = {
	title?: string;
	cancelText?: string;
	confirmText?: string;
	onCancel?: () => void;
	onConfirm?: () => void;
};

interface ModalProviderProps {
	children: ReactNode;
}

interface ModalType {
	showError: (message: string | unknown, options?: ErrorOptions) => void;
	showConfirm: (message: string, options?: ConfirmationOptions) => void;
}

const ModalContext = createContext<ModalType>({} as ModalType);

export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [openError, setOpenError] = useState(false);
	const [errorOptions, setErrorOptions] = useState<ErrorOptions | undefined>(
		undefined
	);
	const [messageError, setMessageError] = useState('');
	const [openConfirm, setOpenConfirm] = useState(false);
	const [confirmOptions, setConfirmOptions] = useState<
		ConfirmationOptions | undefined
	>(undefined);
	const [messageConfirm, setMessageConfirm] = useState('');

	const showError = (message: string | unknown, options?: ErrorOptions) => {
		const [displayMessage] = getErrorDetails(message);
		console.error(message);
		setOpenError(true);
		setMessageError(displayMessage.message);
		if (options) {
			setErrorOptions(options);
		} else if (typeof displayMessage.title !== 'undefined') {
			setErrorOptions({ title: displayMessage.title });
		}
	};

	const showConfirm = (message: string, options?: ConfirmationOptions) => {
		setOpenConfirm(true);
		setMessageConfirm(message);
		setConfirmOptions(options);
	};

	return (
		<ModalContext.Provider
			value={{
				showError,
				showConfirm,
			}}
		>
			{children}
			<ModalError
				open={openError}
				message={messageError}
				title={errorOptions?.title}
				onClose={() => {
					setOpenError(false);
					if (errorOptions?.onClose) errorOptions.onClose();
				}}
			/>
			<ModalConfirm
				open={openConfirm}
				message={messageConfirm}
				title={confirmOptions?.title}
				confirmText={confirmOptions?.confirmText}
				cancelText={confirmOptions?.cancelText}
				onCancel={() => {
					setOpenConfirm(false);
					if (confirmOptions?.onCancel) confirmOptions.onCancel();
				}}
				onConfirm={() => {
					setOpenConfirm(false);
					if (confirmOptions?.onConfirm) confirmOptions.onConfirm();
				}}
			/>
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);
