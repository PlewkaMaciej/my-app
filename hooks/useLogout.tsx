import { useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

const useLogout = () => {
  const { t } = useTranslation("login");

  const logoutUser = useCallback(() => {
    return signOut(auth);
  }, []);

  const {
    mutate: logout,
    isLoading,
    isError,
  } = useMutation(logoutUser, {
    onSuccess: () => {
      toast.success(t("logoutSuccess"));
    },
    onError: () => {
      toast.error(t("logoutFailed"));
    },
  });

  return {
    logout,
    isLoading,
    isError,
  };
};

export default useLogout;
