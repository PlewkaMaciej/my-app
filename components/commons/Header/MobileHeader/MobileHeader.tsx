import {
  Box,
  Typography,
  CardMedia,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AiOutlineUser } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import { styles } from "./styles";
import logo from "../../../../public/images/logo_transparent.png";

const menuItem = [
  { name: "aboutUs", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "buyACourse", href: "/buyACourse" },
  { name: "aboutCourse", href: "/aboutCourse" },
  { name: "contact", href: "/contact" },
];

export const MobileHeader = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSelect = (countryCode: string) => {
    const newLocale = countryCode === "GB" ? "en" : "pl";
    i18n.changeLanguage(newLocale);
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  const handleMenuClick = (href: string) => {
    router.push(href);
    setDrawerOpen(false);
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
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setDrawerOpen(true)}
        >
          <BiMenu />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            style: { backgroundColor: "#808080", color: "#fff" }, // style for drawer
          }}
        >
          <List>
            {menuItem.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleMenuClick(item.href)}
              >
                <ListItemText primary={t(item.name)} />
              </ListItem>
            ))}
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
          </List>
        </Drawer>
        <CardMedia
          sx={{ width: "150px", height: "150px" }}
          component="img"
          image={logo.src}
        />
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
        </Box>
      </Box>
    </Box>
  );
};
