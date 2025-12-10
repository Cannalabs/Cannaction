import * as yup from "yup";

const validationSchema = yup.object({
  emailOrNickname: yup.string(),
  password: yup.string().required(),
});

export default validationSchema;
