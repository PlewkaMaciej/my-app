import { Box, Typography } from "@mui/material";
import Footer from "@/components/commons/Footer/Footer";
import { Header } from "@/components/commons/Header/Header";
import { BlogSection } from "@/components/Blog/BlogSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { theme } from "./_app";
import { CustomButton } from "@/components/commons/Button/Button";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      "aboutUs",
      "common",
      "footer",
      "login",
      "blog",
    ])),
  },
});
const Blog = () => {
  const user = useAuth();
  const { push } = useRouter();
  const { t } = useTranslation(["blog"]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "50px",
            textAlign: "center",
            alignItems: "center",
            width: "100%",
            [theme.breakpoints.down(600)]: {
              justifyContent: "center",
              flexDirection: "column",
              gap: "24px",
            },
          }}
        >
          <Typography variant="h1">{t("blog")}</Typography>
          <CustomButton
            style={{ maxWidth: "250px", height: "70px" }}
            text={t("addBlog")}
            onClick={() => {
              user ? null : toast.error(t("needToLoginForAddingPost"));
              user ? push("addBlog") : push("login");
            }}
          />
        </Box>
        <BlogSection />
      </Box>
      <Footer />
    </Box>
  );
};

export default Blog;
