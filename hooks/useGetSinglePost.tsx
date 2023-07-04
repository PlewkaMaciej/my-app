import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { firestore } from "@/firebase";

interface PostData {
  id: string;
  nickname: string;
  title: string;
  text: string;
  photo?: string;
  createdAt: number;
}

const useGetPost = (postId: string) => {
  const [post, setPost] = useState<PostData | null>(null);

  const getPost = async (postId: string) => {
    const postRef = doc(firestore, "posts", postId);
    const docSnapshot = await getDoc(postRef);

    if (docSnapshot.exists()) {
      const postData = docSnapshot.data() as PostData;
      setPost(postData);
    } else {
      setPost(null);
    }
  };

  const { refetch: refetchPost } = useQuery(["post", postId], () =>
    getPost(postId)
  );

  useEffect(() => {
    refetchPost();
  }, [postId, refetchPost]);

  return post;
};

export default useGetPost;
