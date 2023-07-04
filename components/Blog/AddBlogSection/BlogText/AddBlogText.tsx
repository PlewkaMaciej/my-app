import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useTranslation } from "next-i18next";
import { addBlogInitialValues } from "../InitialValues";
import { FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "@/redux/blogFormState";
import { RootState } from "@/redux/store";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface AddBlogText {
  formik: FormikProps<typeof addBlogInitialValues>;
}
export const AddBlogText = ({ formik }: AddBlogText) => {
  const { t } = useTranslation("blog");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "link",
  ];
  const dispatch = useDispatch();
  const text = useSelector((state: RootState) => state.blogForm.text);
  const handleQuillChange = (content: string) => {
    dispatch(setText(content));
    formik.setFieldValue("text", content);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography variant="h6">{t("addBlogText")}</Typography>
      <ReactQuill
        value={text}
        onChange={handleQuillChange}
        modules={quillModules}
        formats={quillFormats}
        theme="snow"
        style={{
          background: "white",
        }}
      />
    </Box>
  );
};
