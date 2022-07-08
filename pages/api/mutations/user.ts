import { useMutation } from "react-query";
import {
  ForgotPassword,
  GetNotifications,
  Login,
  ResetPassword,
  SignUp,
} from "../services/user";

const useRegister = () => useMutation(SignUp);

const useLogin = () => useMutation(Login);

const useResetPassword = () => useMutation(ResetPassword);

const useForgotPassword = () => useMutation(ForgotPassword);

export { useRegister, useLogin, useResetPassword, useForgotPassword };
