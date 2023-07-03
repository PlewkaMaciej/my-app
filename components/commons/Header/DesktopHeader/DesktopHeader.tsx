import { Box, Typography, CardMedia, Link } from "@mui/material";
import { styles } from "./styles";
import logo from "../../../../public/images/logo_transparent.png";
import { AiOutlineUser } from "react-icons/ai";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ReactFlagsSelect from "react-flags-select";

const menuItem = [
  { name: "aboutUs", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "aboutCourse", href: "/aboutCourse" },
  { name: "buyACourse", href: "/buyACourse" },
  { name: "contact", href: "/contact" },
];

export const DesktopHeader = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const handleSelect = (countryCode: string) => {
    const newLocale = countryCode === "GB" ? "en" : "pl";
    i18n.changeLanguage(newLocale);
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };
  return (
    <Box sx={styles.headerBox}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          width: "100%",
          pr: "3%",
          pl: "3%",
        }}
      >
        <CardMedia
          sx={{ width: "150px", height: "150px" }}
          component="img"
          image={logo.src}
        />
        <Box sx={{ display: "flex", gap: "100px" }}>
          {menuItem.map((item, index) => (
            <Typography
              variant="h6"
              key={index}
              sx={{ textDecoration: "none", color: "white", cursor: "pointer" }}
              onClick={() => {
                router.push(item.href);
              }}
            >
              {t(item.name)}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "60px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              flexDirection: "column",
            }}
            onClick={() => {
              router.push("/login");
            }}
          >
            <AiOutlineUser size={36} color="white" />
            <Typography variant="body1">{t("login")}</Typography>
          </Box>
          {router.locale && (
            <Box sx={{ color: "black" }}>
              <ReactFlagsSelect
                selected={router.locale === "en" ? "GB" : "PL"}
                countries={["PL", "GB"]}
                customLabels={{ PL: "Polish", GB: "English" }}
                selectedSize={14}
                onSelect={handleSelect}
                placeholder={t("selectCountry")}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
