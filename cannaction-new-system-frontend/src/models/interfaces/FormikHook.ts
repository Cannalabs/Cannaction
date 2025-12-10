/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikErrors, FormikState, FormikTouched } from 'formik';

export type FormikHandleSubmit = (
	e?: React.FormEvent<HTMLFormElement> | undefined
) => void;
export type FormikHandleReset = (e: any) => void;
export type FormikSetFieldValue<Values> = (
	field: string,
	value: any,
	shouldValidate?: boolean | undefined
) => Promise<FormikErrors<Values>> | Promise<void>;
export type FormikHandleBlur = {
	(e: React.FocusEvent<any>): void;
	<T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
};
export type FormikHandleChange = {
	(e: React.ChangeEvent<any>): void;
	<T_1 = string | React.ChangeEvent<any>>(
		field: T_1
	): T_1 extends React.ChangeEvent<any>
		? void
		: (e: string | React.ChangeEvent<any>) => void;
};

export type FormikSetValues<Values> = (
	values: React.SetStateAction<Values>,
	shouldValidate?: boolean | undefined
) => Promise<FormikErrors<Values>> | Promise<void>;

export type FormikResetForm<Values> = (nextState?: Partial<FormikState<Values>> | undefined) => void;

export default interface FormikHook<Values> {
	initialValues: Values;
	initialErrors: FormikErrors<unknown>;
	initialTouched: FormikTouched<unknown>;
	initialStatus: any;
	handleBlur: FormikHandleBlur;
	handleChange: FormikHandleChange;
	handleReset: FormikHandleReset;
	handleSubmit: FormikHandleSubmit;
	resetForm: FormikResetForm<Values>;
	setFieldValue: FormikSetFieldValue<Values>;
	setValues: FormikSetValues<Values>;
	isValid: boolean;
	dirty: boolean;
	values: Values;
	errors: FormikErrors<Values>;
	touched: FormikTouched<Values>;
	isSubmitting: boolean;
	setSubmitting: (isSubmitting: boolean) => void;
}
