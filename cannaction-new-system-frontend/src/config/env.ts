import * as yup from 'yup';

const envSchema = yup.object({
	MODE: yup
		.string()
		.oneOf(['development', 'test', 'production'])
		.default('development'),
	VITE_APP_BASE_URL: yup.string().optional(),
	VITE_APP_BASIC_TOKEN: yup.string().optional(),
});

const envTestSchema = yup.object({
	MODE: yup
		.string()
		.oneOf(['development', 'test', 'production'])
		.default('development'),
	VITE_APP_BASE_URL: yup.string().optional(),
	VITE_APP_BASIC_TOKEN: yup.string().optional(),
});

const getEnv = () => {
	if (import.meta.env.NODE_ENV === 'test')
		return envTestSchema.validateSync(import.meta.env);
	return envSchema.validateSync(import.meta.env);
};

const env = getEnv();

export default env;
