import { Box } from "@mui/material";
export const BlogSection = () => {
  return (
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
          padding: "40px",
          border: "2px solid rgba(170, 207, 208, 1)",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "1200px",
          width: "100%",
          height: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      ></Box>
    </Box>
  );
};
