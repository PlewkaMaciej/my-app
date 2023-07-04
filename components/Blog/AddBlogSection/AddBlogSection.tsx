import { Box, Typography } from "@mui/material";
import { AddBlogText } from "./BlogText/AddBlogText";
import { useState } from "react";
import { CustomButton } from "@/components/commons/Button/Button";
import { useTranslation } from "next-i18next";
import { AddPhoto } from "./AddPhoto/AddPhoto";
import { useFormik } from "formik";
import { addBlogInitialValues } from "./InitialValues";
import { addBlogValidationSchema } from "./ValidationSchema";
import { CustomTextField } from "@/components/commons/Input/Input";
export const AddBlogSection = () => {
  const { t } = useTranslation("blog");
  const formik = useFormik({
    initialValues: addBlogInitialValues,
    validationSchema: addBlogValidationSchema,
    onSubmit: async (values) => {
      formik.resetForm();
    },
  });
  return (
    <form>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          paddingBottom: "120px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f9f9f9",

            border: "2px solid rgba(170, 207, 208, 1)",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "1200px",
            width: "100%",
            minHeight: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",

            p: "40px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="h6">{t("addTitle")}</Typography>
            <CustomTextField
              name="title"
              label={t("title")}
              isError={!!(formik.touched.title && formik.errors.title)}
              error={formik.errors.title ? t(formik.errors.title) : ""}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>

          <AddPhoto />
          <AddBlogText />
          <Box sx={{ display: "flex", justifyContent: "center", pt: "100px" }}>
            <CustomButton
              text={t("addPost")}
              style={{ width: "200px", height: "70px" }}
            />
          </Box>
        </Box>
      </Box>
    </form>
  );
};
