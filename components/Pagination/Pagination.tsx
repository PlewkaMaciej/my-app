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

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <CustomButton
            key={i}
            text={i.toString()}
            onClick={() => handlePageChange(i)}
            disabled={i === currentPage}
          />
        );
      }
    } else if (currentPage <= 2) {
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(
          <CustomButton
            key={i}
            text={i.toString()}
            onClick={() => handlePageChange(i)}
            disabled={i === currentPage}
          />
        );
      }
    } else if (currentPage >= totalPages - 1) {
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(
          <CustomButton
            key={i}
            text={i.toString()}
            onClick={() => handlePageChange(i)}
            disabled={i === currentPage}
          />
        );
      }
    } else {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <CustomButton
            key={i}
            text={i.toString()}
            onClick={() => handlePageChange(i)}
            disabled={i === currentPage}
          />
        );
      }
    }

    return pageNumbers;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        justifyContent: "center",

        pb: "200px",
      }}
    >
      <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {renderPageNumbers()}
      </Box>
    </Box>
  );
};

export default Pagination;
