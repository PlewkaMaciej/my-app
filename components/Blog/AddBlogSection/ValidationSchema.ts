import * as Yup from "yup";

export const addBlogValidationSchema = Yup.object({
  title: Yup.string().required("required"),
});