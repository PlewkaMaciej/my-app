import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { useTranslation } from "next-i18next";
import { CustomButton } from "../commons/Button/Button";

interface PaginationProps {
  count: number;
  limitCount: number;
  maxPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  count,
  limitCount,
  maxPages,
  onPageChange,
}: PaginationProps) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.min(Math.ceil(count / limitCount), maxPages);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  if (count === 0) {
    return <Typography>{t("noPostAddsome")}</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "30px",
        justifyContent: "center",
        pb: "200px",
        alignItems: "center",
      }}
    >
      <CustomButton
        style={{ width: "200px" }}
        text={t("previous")}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <CustomButton
        style={{ width: "200px" }}
        text={t("next")}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Box>
  );
};

export default Pagination;
