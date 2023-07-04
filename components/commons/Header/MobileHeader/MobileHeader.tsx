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
import { theme } from "@/pages/_app";
import { useState } from "react";
import { styles } from "./styles";
import logo from "../../../../public/images/logo_transparent.png";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import { BiLogOutCircle } from "react-icons/bi";
const menuItem = [
  { name: "aboutUs", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "buyACourse", href: "/buyACourse" },
  { name: "aboutCourse", href: "/aboutCourse" },
  { name: "contact", href: "/contact" },
];

export const MobileHeader = () => {
  const user = useAuth();
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout } = useLogout();
  const handleSelect = (countryCode: string) => {
    const newLocale = countryCode === "GB" ? "en" : "pl";
    i18n.changeLanguage(newLocale);
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  const handleMenuClick = (href: string) => {
    router.push(href);
    setDrawerOpen(false);
  };
  const menuItemsWithAccount = user
    ? [...menuItem, { name: "myAcc", href: "/userProfile" }]
    : menuItem;
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
          [theme.breakpoints.down(360)]: {
            justifyContent: "center",
          },
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, height: "100px" }}
          onClick={() => setDrawerOpen(true)}
        >
          <BiMenu size={36} />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            style: {
              backgroundColor: "#F8F8F8",
              color: "#333",
              width: "200px",
            },
          }}
        >
          <List>
            {menuItemsWithAccount.map((item, index) => (
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderBottom: "1px solid black",
                  "&:hover": {
                    backgroundColor: "#E0E0E0",
                    cursor: "pointer",
                  },
                  padding: "10px 20px",
                }}
                key={index}
                onClick={() => handleMenuClick(item.href)}
              >
                <ListItemText
                  primary={t(item.name)}
                  primaryTypographyProps={{
                    variant: "h6",
                    style: {
                      color: "#333",
                      fontWeight: "bold",
                    },
                  }}
                />
              </ListItem>
            ))}
            <Box
              sx={{
                color: "black",
                pl: "3%",
                pr: "3%",
                pt: "6%",
              }}
            >
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
              [theme.breakpoints.down(550)]: {
                display: "none",
              },
            }}
            onClick={() => {
              user ? router.push("/userProfile") : router.push("/login");
            }}
          >
            <AiOutlineUser size={36} color="white" />
            {user ? (
              <Typography variant="body1">{t("myAcc")}</Typography>
            ) : (
              <Typography variant="body1">{t("login")}</Typography>
            )}
          </Box>
          {user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                flexDirection: "column",
                [theme.breakpoints.down(360)]: {
                  display: "none",
                },
              }}
              onClick={() => logout()}
            >
              <BiLogOutCircle size={36} color="white" />
              <Typography variant="body1">{t("logout")}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
