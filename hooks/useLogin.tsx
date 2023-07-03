import { useMutation } from "react-query";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface loginProps {
  email: string;
  password: string;
}

const useLogin = () => {
  const { push } = useRouter();
  const { t } = useTranslation("login");

  const loginUser = ({ email, password }: loginProps) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const {
    mutate: login,
    isLoading,
    isError,
  } = useMutation(loginUser, {
    onSuccess: () => {
      toast.success(t("loginSuccess"));
      push("/");
    },
    onError: () => {
      toast.error(t("loginFailed"));
    },
  });

  return {
    login,
    isLoading,
    isError,
  };
};

export default useLogin;
