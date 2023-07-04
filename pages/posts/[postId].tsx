import { Box, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useGetPost from "@/hooks/useGetSinglePost";
import Footer from "@/components/commons/Footer/Footer";
import { Header } from "@/components/commons/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
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
const Post = () => {
  const router = useRouter();
  const { postId } = router.query;

  const post = useGetPost(typeof postId === "string" ? postId : "");

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
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: "120px",
          pb: "120px",
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

            display: "flex",
            flexDirection: "column",
            gap: "24px",
            overflowY: "auto",
          }}
        >
          {post && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "48px",
                p: "24px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "4px",
                }}
              >
                <Typography variant="body1" sx={{ color: "grey" }}>
                  {post.nickname}{" "}
                </Typography>
                <Typography variant="body1" sx={{ color: "grey" }}>
                  {new Date(post.createdAt).toLocaleDateString()}{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h1">{post.title}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <CardMedia
                  sx={{ width: "100%", height: "400px", objectFit: "contain" }}
                  component="img"
                  src={post.photo}
                  alt="Post Photo"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                dangerouslySetInnerHTML={{ __html: post.text }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Post;
