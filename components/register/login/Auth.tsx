import { Typography, Box } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { theme } from "@/pages/_app";
import { motion } from "framer-motion";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";

export const Auth = () => {
  const { t } = useTranslation("login");
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (option: number) => {
    if (selectedOption !== option) {
      setSelectedOption(option);
    }
  };

  return (
    <motion.div
      style={{
        justifyContent: "center",
        display: "flex",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "40px",
          border: "2px solid rgba(170, 207, 208, 1)",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: "24px",
            [theme.breakpoints.down(400)]: {
              flexDirection: "column",
              padding: "0px",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              textAlign: "center",
            },
          }}
        >
          <motion.div
            style={{
              borderBottom:
                selectedOption === 0
                  ? "2px solid rgba(170, 207, 208, 1)"
                  : "none",
              width: "50%",
              display: "flex",
              justifyContent: "center",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionChange(0)}
          >
            <Typography variant="h6" sx={{ cursor: "pointer" }}>
              {t("login")}
            </Typography>
          </motion.div>
          <motion.div
            style={{
              borderBottom:
                selectedOption === 1
                  ? "2px solid rgba(170, 207, 208, 1)"
                  : "none",
              width: "50%",
              display: "flex",
              justifyContent: "center",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionChange(1)}
          >
            <Typography variant="h6" sx={{ cursor: "pointer" }}>
              {t("register")}
            </Typography>
          </motion.div>
        </Box>
        <motion.div
          key={selectedOption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {selectedOption === 0 ? <SignIn /> : <SignUp />}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
