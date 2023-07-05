import { Box, Typography, CircularProgress } from "@mui/material";
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
import useGetPosts from "@/hooks/useGetPosts";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, postCount, totalPages, isLoading } = useGetPosts(
    currentPage,
    8
  );

  const user = useAuth();
  const { push } = useRouter();
  const { t } = useTranslation(["blog"]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ flex: "1" }}>
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

        <Box sx={{ flex: "1", minHeight: "1000px" }}>
          {posts && <BlogSection posts={posts} />}

          {posts && (
            <Pagination
              count={postCount}
              limitCount={8}
              maxPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Blog;
