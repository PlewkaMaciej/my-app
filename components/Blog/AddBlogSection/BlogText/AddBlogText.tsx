import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useTranslation } from "next-i18next";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const AddBlogText = () => {
  const { t } = useTranslation("blog");
  const [value, setValue] = useState("");

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

  const handleQuillChange = (content: string) => {
    setValue(content);
    console.log(content);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography variant="h6">{t("addBlogText")}</Typography>
      <ReactQuill
        value={value}
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
