import { Box } from "@mui/material";
import Footer from "@/components/commons/Footer/Footer";
import { Header } from "@/components/commons/Header/Header";
import { Auth } from "@/components/register/login/Auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      "aboutUs",
      "common",
      "footer",
      "login",
    ])),
  },
});
const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ flex: "1 0 auto" }}>
        <Header />
        <Auth />
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
