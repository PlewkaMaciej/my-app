import { Box, Typography, CardMedia } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { theme } from "@/pages/_app";
import { useRouter } from "next/router";
interface BlogSectionInterface {
  posts: DocumentData[];
}

export const BlogSection = ({ posts }: BlogSectionInterface) => {
  const { push } = useRouter();
  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        paddingBottom: "20px",
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
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {posts.map((post) => (
            <Box
              key={post.id}
              sx={{
                backgroundColor: "#e8e8e8",
                borderRadius: "8px",
                padding: "16px",
                border: "1px solid #ccc",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                transition: "background-color 0.3s",
                ":hover": {
                  backgroundColor: "#d6d6d6",
                },
              }}
              onClick={() => {
                push(`posts/${post.id}`);
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                  [theme.breakpoints.down(380)]: {
                    flexDirection: "column",
                  },
                }}
              >
                <Typography variant="h6">{post.nickname}:</Typography>
                <Typography variant="h6">{post.title}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "16px",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              ></Box>
              <Typography variant="body2">
                {new Date(post.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
