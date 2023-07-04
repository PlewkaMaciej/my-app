import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { firestore } from "@/firebase";

const useGetPost = (page: number = 1, limitCount: number = 2) => {
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const getPosts = async (page: number) => {
    const postRef = collection(firestore, "posts");
    let q = query(postRef, orderBy("createdAt", "desc"), limit(limitCount));

    if (page > 1 && lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    if (querySnapshot.docs.length > 0) {
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    }

    return posts;
  };

  const getPostCount = async () => {
    const postRef = collection(firestore, "posts");
    const querySnapshot = await getDocs(postRef);
    const postCount = querySnapshot.size;
    return postCount;
  };

  const { data: posts, refetch: refetchPosts } = useQuery(
    ["posts", page],
    () => getPosts(page),
    {
      keepPreviousData: true,
    }
  );

  const { data: postCount = 0 } = useQuery("postCount", getPostCount);

  const totalPages = Math.ceil(postCount / limitCount);

  useEffect(() => {
    refetchPosts();
  }, [page, refetchPosts]);

  return {
    posts,
    postCount,
    totalPages,
    currentPage: page,
  };
};

export default useGetPost;
