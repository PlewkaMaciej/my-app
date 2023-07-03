import { Box, Typography } from "@mui/material";
import { FaInstagram, FaTiktok, FaFacebookSquare } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const footerItems = [
  { name: "faq", href: "/faq" },
  { name: "report", href: "/report" },
  { name: "privacyPolicy", href: "/privacy-policy" },
  { name: "cookiesPolicy", href: "/cookies-policy" },
];

const Footer = () => {
  const { push } = useRouter();
  const { t } = useTranslation("footer");
  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #333333 30%, #666666 90%)",
        border: 0,
        boxShadow: "0 3px 5px 2px rgba(128, 128, 128, .3)",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
          width: "100%",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <FaInstagram size={24} />
        <FaTiktok size={24} />
        <FaFacebookSquare size={24} />
      </Box>
      <Typography variant="h6">© MathsApp</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        {footerItems.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              push(item.href);
            }}
          >
            {t(item.name)}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;
