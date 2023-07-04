import { useMutation } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
interface AddPostProps {
  photo: File | null;
  text: string;
  title: string;
  nickname: string;
}

const useAddPost = () => {
  const { push } = useRouter();
  const { t } = useTranslation("blog");
  const storage = getStorage();
  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(storage);
    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const addPostToDB = async ({
    photo,
    text,
    title,
    nickname,
  }: AddPostProps) => {
    let photoUrl = "";
    if (photo) {
      photoUrl = await uploadImage(photo);
    }

    const docRef = await addDoc(collection(firestore, "posts"), {
      photo: photoUrl,
      text,
      title,
      nickname,
      createdAt: Date.now(),
    });

    return docRef.id;
  };

  const {
    mutate: addPost,
    isLoading,
    isError,
  } = useMutation(addPostToDB, {
    onSuccess: () => {
      toast.success(t("postSuccess"));
      push("/blog");
    },
    onError: () => {
      toast.error(t("postFailed"));
    },
  });

  return {
    addPost,
    isLoading,
    isError,
  };
};

export default useAddPost;
