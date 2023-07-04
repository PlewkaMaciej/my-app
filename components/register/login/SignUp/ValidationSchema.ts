import * as Yup from "yup";

export const SignUpValidationSchema = Yup.object({
  email: Yup.string().email("invalidemail").required("required"),
  password: Yup.string()
    .required("required")
    .min(8, "tooshort")
    .max(15, "toolong"),
    nickname: Yup.string()
    .required("required")
    .min(8, "tooshort")
    .max(15, "toolong"),
});