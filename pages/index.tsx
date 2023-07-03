import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Header } from "@/components/commons/Header/Header";
import { Box, Typography, CardMedia, Slide, Fade } from "@mui/material";
import logo from "../public/images/logo_transparent.png";
import photo from "../public/images/photo1.png";
import photo2 from "../public/images/photo2.png";
import { theme } from "./_app";
import { FaStar } from "react-icons/fa";
import Footer from "@/components/commons/Footer/Footer";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      "aboutUs",
      "common",
      "footer",
    ])),
  },
});

function Home() {
  const { t } = useTranslation("aboutUs");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Header />
      <Slide direction="up" in={true} timeout={1000} mountOnEnter unmountOnExit>
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              p: "50px",
              textAlign: "center",
            }}
          >
            <Typography variant="h1">{t("aboutUs")}</Typography>
          </Box>
        </Fade>
      </Slide>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "50px",
          pl: "100px",
          pr: "100px",
          pb: "100px",
          [theme.breakpoints.down(1200)]: {
            flexDirection: "column",
            p: "0px",
            pb: "24px",
          },
        }}
      >
        <Fade in={true} timeout={1500}>
          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              padding: "40px",
              border: "2px solid rgba(170, 207, 208, 1)",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              maxWidth: "800px",
            }}
          >
            <Box
              sx={{
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
                  justifyContent: "space-between",
                  gap: "16px",
                  alignItems: "center",
                  width: "100%",
                  [theme.breakpoints.up(1200)]: {
                    justifyContent: "center",
                  },
                  [theme.breakpoints.down(530)]: {
                    justifyContent: "center",
                  },
                }}
              >
                <CardMedia
                  sx={{
                    maxHeight: "100px",
                    maxWidth: "100%",
                    objectFit: "contain",
                    [theme.breakpoints.up(1200)]: {
                      display: "none",
                    },
                    [theme.breakpoints.down(530)]: {
                      display: "none",
                    },
                  }}
                  component="img"
                  image={photo.src}
                />
                <CardMedia
                  sx={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                  component="img"
                  image={logo.src}
                />
                <CardMedia
                  sx={{
                    maxHeight: "100px",
                    maxWidth: "100%",
                    objectFit: "contain",
                    [theme.breakpoints.up(1200)]: {
                      display: "none",
                    },
                    [theme.breakpoints.down(530)]: {
                      display: "none",
                    },
                  }}
                  component="img"
                  image={photo2.src}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  marginTop: "20px",
                  textAlign: "center",
                  color: "#333333",
                }}
              >
                {t("aboutUsTitle")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: "20px",
                  textAlign: "center",
                  color: "#666666",
                }}
              >
                {t("aboutUsDescription")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                  gap: "12px",
                }}
              >
                <FaStar size={24} color="#FFCC00" />
                <FaStar size={24} color="#FFCC00" />
                <FaStar size={24} color="#FFCC00" />
                <FaStar size={24} color="#FFCC00" />
                <FaStar size={24} color="#FFCC00" />
              </Box>
            </Box>
          </Box>
        </Fade>

        <Fade in={true} timeout={1500}>
          <CardMedia
            sx={{
              objectFit: "cover",
              maxWidth: "400px",
              [theme.breakpoints.down("lg")]: {
                width: "300px",
              },
              [theme.breakpoints.down(1200)]: {
                display: "none",
              },
            }}
            component="img"
            image={photo.src}
          />
        </Fade>

        <Fade in={true} timeout={1500}>
          <CardMedia
            sx={{
              objectFit: "cover",
              maxWidth: "250px",
              [theme.breakpoints.down(1500)]: {
                width: "170px",
              },
              [theme.breakpoints.down(1200)]: {
                display: "none",
              },
            }}
            component="img"
            image={photo2.src}
          />
        </Fade>
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
