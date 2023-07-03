import { CustomTextField } from "@/components/commons/Input/Input";
import { Box } from "@mui/material";
import { CustomButton } from "@/components/commons/Button/Button";
import { useFormik } from "formik";
import { signInInitialValues } from "../SignIn/InitialValues";
import { passwordValidationSchema } from "../SignIn/ValidationSchema";
import { useTranslation } from "next-i18next";
import useRegister from "@/hooks/useRegister";

export const SignUp = () => {
  const { t } = useTranslation("login");
  const formik = useFormik({
    initialValues: signInInitialValues,
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      await register({ email: values.email, password: values.password });
      formik.resetForm();
    },
  });

  const { register, isLoading, isError } = useRegister();

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <CustomTextField
          name="email"
          label={t("email")}
          isError={!!(formik.touched.email && formik.errors.email)}
          error={formik.errors.email ? t(formik.errors.email) : ""}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <CustomTextField
          name="password"
          label={t("password")}
          type="password"
          isError={!!(formik.touched.password && formik.errors.password)}
          error={formik.errors.password ? t(formik.errors.password) : ""}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CustomButton
            style={{ maxWidth: "150px", height: "50px" }}
            text={t("signUp")}
            type="submit"
            disabled={!formik.isValid || !formik.dirty || isLoading}
          />
        </Box>
      </Box>
    </form>
  );
};
