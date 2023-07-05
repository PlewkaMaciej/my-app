import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useState } from "react";
import { CustomButton } from "@/components/commons/Button/Button";
import { useTranslation } from "next-i18next";
import { FormikProps } from "formik";
import { addBlogInitialValues } from "../InitialValues";
interface AddPhotoProps {
  formik: FormikProps<typeof addBlogInitialValues>;
}
export const AddPhoto = ({ formik }: AddPhotoProps) => {
  const { t } = useTranslation("blog");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
      formik.setFieldValue("photo", e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.items && e.dataTransfer.items[0].kind === "file") {
      const file = e.dataTransfer.items[0].getAsFile();
      if (file) {
        setSelectedImage(file);
        formik.setFieldValue("photo", file);
      }
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography variant="h6">{t("addPhoto")}</Typography>

      <Box
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed grey",
          borderRadius: "8px",
          p: "8px",
          justifyContent: "center",
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          height: "200px",
          gap: "12px",
        }}
      >
        <input
          type="file"
          accept="image/*"
          id="file-input"
          hidden
          onChange={handleImageChange}
        />
        <CustomButton
          style={{ width: "150px" }}
          text={t("addPhotoButton")}
          onClick={() => document.getElementById("file-input")?.click()}
        />
        <Typography>{t("or")}</Typography>
        <Typography>{t("dragAndDropFile")}</Typography>
      </Box>

      {selectedImage && (
        <Box
          sx={{
            border: "1px solid grey",
            p: "10px",
            justifyContent: "center",
            width: "250px",
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{
              width: "200px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        </Box>
      )}
    </Box>
  );
};
