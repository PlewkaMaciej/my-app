import { useMutation } from "react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface registerProps {
  email: string;
  password: string;
  nickname: string;
}

const useRegister = () => {
  const { push } = useRouter();
  const { t } = useTranslation("login");

  const registerUser = async ({ email, password, nickname }: registerProps) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      await updateProfile(user, { displayName: nickname });
    }

    await signInWithEmailAndPassword(auth, email, password);
    return user;
  };

  const {
    mutate: register,
    isLoading,
    isError,
  } = useMutation(registerUser, {
    onSuccess: () => {
      toast.success(t("registerSuccess"));
      push("/");
    },
    onError: () => {
      toast.error(t("registerFailed"));
    },
  });

  return {
    register,
    isLoading,
    isError,
  };
};

export default useRegister;
