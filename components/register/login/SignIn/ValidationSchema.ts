import * as Yup from "yup";

export const SignInValidationSchema = Yup.object({
  email: Yup.string().email("invalidemail").required("required"),
  password: Yup.string()
    .required("required")
    .min(8, "tooshort")
    .max(15, "toolong"),
   
});